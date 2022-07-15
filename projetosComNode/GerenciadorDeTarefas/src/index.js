const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers;
  const user = users.find((user) => user.username === username);
  if (!user){
    return response.status(404).json({error: "User not found."})
  }
  request.user = user;
  return next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const userAlreadyExists = users.find(user => user.username === username)
  if(userAlreadyExists){
    return response.status(400).json({error: "Username already exists."})
  }
  const user = {
    id: uuidv4(),
    name,
    username,
    todos:[],
  }
  users.push(user)
  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {user} = request;

  return response.json(user.todos); 
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  
  const toDo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  }
  user.todos.push(toDo)

  return response.status(201).send(toDo)
}); 

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const { id } = request.params;

  const toDo = user.todos.find(toDo => toDo.id === id);

  if (!toDo){
    return response.status(404).json({error: "to do não encontrado."})
  }

  toDo.title = title;
  toDo.deadline = new Date(deadline)

  return response.status(200).send(toDo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const toDo = user.todos.find(toDo => toDo.id === id);

  if (!toDo){
    return response.status(404).json({error: "to do não encontrado."})
  }

  toDo.done = true;

  return response.status(201).send(toDo)
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  
  const toDo = user.todos.find(toDo => toDo.id === id);
 
  if (!toDo){
    return response.status(404).json({error: "to do não encontrado."})
  }

  user.todos.splice(toDo, 1)

  return response.status(204).send(user.todos)

});

module.exports = app;