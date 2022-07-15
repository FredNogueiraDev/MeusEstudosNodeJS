const { response } = require('express');
const express = require('express')
const { v4: uuidv4 } = require("uuid")

const app = express();
app.use(express.json())

const customers = [];
function verifyIfExistsAcountCPF(req,res,next){
    const {cpf} = req.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer){
        return res.status(400).json({error: "Customer not found"})
    }

    req.customer = customer;
    //todos os middlewares que chamarem essa função receberão o customer de dentro do request
    return next()
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === "credit"){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    }, 0)
    return balance;
}

app.post("/account", (req, res) => {
    const {cpf, name} = req.body;
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf);

    if(customerAlreadyExists){
        return res.status(400).json({error: "Customer already exists!"});
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    })

    return res.status(201).send();
})

app.get("/statement", verifyIfExistsAcountCPF, (req, res) => {
    const { customer } = req;

    return res.json(customer.statement);
})

app.post("/deposit", verifyIfExistsAcountCPF, (req,res) => {
    const { description, amount } = req.body;

    const {customer} = req;

    const statementOperation = {
        description,
        amount,
        dreated_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation)
    return res.status(201).send()
})

app.post("/withdraw", verifyIfExistsAcountCPF, (req,res) => {
    const { amount } = req.body;

    const {customer} = req;

    const statementOperation = {
        amount,
        dreated_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation)
    return res.status(201).send()
})

app.put("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {name} = req.body;
    const {customer} = req;

    customer.name = name;

    
    return res.status(201).send()
})

app.get("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {customer} = req;

    return res.json(customer)
})

app.delete("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {customer} = req;
    customers.splice(customer, 1);
    return res.status(200).json(customers)
})

app.get("/balance",verifyIfExistsAcountCPF, (req, res) => {
    const { customer } = req;

    const balance = getBalance(customer.statement);

    return res.json(balance);
})

app.listen(3333)
console.log('http://localhost:3333/')