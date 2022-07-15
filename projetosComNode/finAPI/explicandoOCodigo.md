# FinAPI
Este código é um back-end de um banco, feito no curso Ignite da rocketseat usando NodeJS, para ele funcionar deve-se usar o Insomnia, ou algum app semelhante.

```jsx
const { response } = require('express');
const express = require('express')
const { v4: uuidv4 } = require("uuid")
//uuid v4 gera números aleatórios, nesse caso seria o número da conta.

const app = express();
app.use(express.json())
//Convertendo o express para ler JSON

const customers = [];
//banco de dados fake

//middlewear
function verifyIfExistsAcountCPF(req,res,next){
    const {cpf} = req.headers
    const customer = customers.find((customer) => customer.cpf === cpf)
    if (!customer){
        return res.status(400).json({error: "Customer not found"})
    }
	 //o middlewear está verificando se a conta já existe

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
		//criando condição para depósito e saque.
    return balance;
}
app.post("/account", (req, res) => {
    const {cpf, name} = req.body;
		//informações do cliente
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);
		//função sendo usada para verificar se o cpf do cliente já existe no banco de dados.   
		if(customerAlreadyExists){
        return response.status(400).json({error: "Customer already exists!"});
		    //Dando o erro 400 caso o cliente já possua o cpf cadastrado.
		}

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
		//Adicionando os dados do cliente ao "banco de dados"
    return res.status(201).send();
		//status 201 seria conta criada com sucesso.
})
//função get com o middlewear incluso
app.get("/statement", verifyIfExistsAcountCPF, (req, res) => {
    const { customer } = req;
		//importando o customer do request do middlewear

    return res.json(customer.statement);
})

app.post("/deposit", verifyIfExistsAcountCPF, (req,res) => {
    const { description, amount } = req.body;
		// mandando a descrição e o valor do depósito ao body 

    const {customer} = req;
		// importando os dados do cliente
		//extrato bancario
    const statementOperation = {
        description,
        amount,
        dreated_at: new Date(),
        type: "credit"
    }
		//adicionando os valores ao statement
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
	// saque, mesma situação do depósito, mas com ação negativa controlada pelo getBalance()
    customer.statement.push(statementOperation)
    return res.status(201).send()
})

app.put("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {name} = req.body;
    const {customer} = req;

    customer.name = name;

    return res.status(201).send()
		//função usada para alterar dados do usuário, no caso, o nome.
})

app.get("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {customer} = req;

    return res.json(customer)
		//função usada para retornar as informações das contas.
})

app.delete("/account", verifyIfExistsAcountCPF, (req, res) => {
    const {customer} = req;
    customers.splice(customer, 1);
    return res.status(200).json(customers)
		//função usada para deletar uma conta.
})

app.get("/balance",verifyIfExistsAcountCPF, (req, res) => {
    const { customer } = req;
    const balance = getBalance(customer.statement);

    return res.json(balance);
		//função usada para mostrar o saldo do cliente.
})
app.listen(3333)
```

Lembrando que isso deve ser configurado com o insomnia.