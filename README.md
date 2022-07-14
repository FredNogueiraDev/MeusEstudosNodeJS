# NodeJS
## Conhecendo o Node

### Para que serve?

- Backend
- Frontend
- Micro serviços
- API
    - WebApp
    - Mobile
    - Desktop
- Scripts e Automação
- Machine learning
- Inteligencia Artificial

Não é recomendado usar o NODE se precisar de muito processamento, ou seja, CPU, como imagens e vídeos.

### Vantagens

- Rápido
    - Execução
    - Prototipação
- Alta escalabilidade
- Aplicações de ponta
- JS everywhere
- Ecossistema gigante

### O que é?

- **JS Runtime Enviroment**
    
    O node funciona como um mini sistema operacional, possui um ambiente completamente dele, apenas para executar JavaScript, ele troca informações com o SO da máquina, que troca informações com os hardwares. Não se roda JS sem um ambiente especial, que no caso é o NodeJS, sendo assim, o mesmo não é um framework e muito menos uma linguagem de programação.
    

## V8

- Interpretador de JS para linguagem de máquina
- Criado em C++
- Baseado nas últimas features do JS
- Focado para Chrome mas tem todo o cuidado de não quebrar o node
- Não possui DOM, console ou File System

```jsx
function run() {
	return 'hello!';
}
```

---

## Como funciona?

O node é single-threaded, non-blocking e asynchronous, ou seja, ele faz várias funções ao simultaneamente, sem parar e em looping, assim conseguimos explicar as altas velocidades, pois ele recebe e realiza os pedidos sem parar, ao contrário do Apache, por exemplo.

- Ilustrando:
    
    ```jsx
    function c(){
    	console.log('c')
    	return
    }
    function b(){
    	console.log('b')
    	return c()
    }
    function a(){
    b()
    console.log('a')
    return
    }
    a()
    //b
    //c
    //a
    ```
    
    O resultado foi esse porque a função ‘a’ chama a função ‘b’, que executa um `console.log` e retorna a função ‘c’, que também executa um `console.log` e não retorna nada e só depois disso a função ‘a’ termina de ser executada.
    

---

## Configurando o ambiente

- **Instalação**
    
    Ao entrar no site do node ([https://nodejs.org/en/](https://nodejs.org/en/)), o mesmo identifica o sistema operacional da máquina e dá as versões disponíveis, o mais recomendável é a versão LTS, depois de baixar e instalar, deve-se entrar no terminal e digitar `node -v` e `npm -v`, para verificar se estão instalados corretamente.
    
- **REPL**
    
    REPL quer dizer Read-Eval-Print-Loop, a função do mesmo é escrever JavaScript em um ambiente node, direto do terminal, para isso, basta digitar `node` no terminal e começar a utilizar, para sair, digite `.exit`.
    

---

## Iniciando a prática

Após escrever o código, basta digitar `node “nome do arquivo”` sem as aspas, e o código será executado diretamente do terminal, sem o browser, e tudo funcionará corretamente.

- **Como ler, exportar módulos**
    
    ```jsx
    module.exports = "Estou lendo o modulo"
    ```
    
    ```jsx
    const myModule = require('./exports')
    console.log(myModule)
    
    //estou lendo o modulo
    ```
    
- **Pegando informações do processo**
    
    ```jsx
    //Lista de argumentos
    // console.log(process)
    
    const firstName = process.argv[2]
    const lastName = process.argv[3]
    
    console.log(`Seu nome é ${firstName} ${lastName}`)
    ```
    
    No terminal, `node process Fulano de Tal`, ao escrever isso ele retornará: ***“Seu nome é Fulano de Tal”** .*
    
    ---
    
    Outra forma, poderia ser com flags…
    
    ```jsx
    //Lista de argumentos
    console.log(process.argv)
    
    const firstName = process.argv[3]
    const lastName = process.argv[5]
    
    console.log(`${firstName} está perguntando, ${lastName}`)
    ```
    
    No terminal
    
    ```jsx
    *node process --name* "Frederico" *--greeting* "Tudo bem com você?"
    // --name e --greeting são flags para melhor entendimento.
    [
      '/usr/bin/node',
      '/home/fred/Documentos/GitHub/JavaScript-Desatualizado/RocketSeat/NodeJS/testes/process/process',
      '--name',
      'Frederico',
      '--greeting',
      'Tudo bem com você?'
    ]
    Frederico está perguntando, Tudo bem com você?
    ```
    

---

## NPM - Node Package Manager

A primeira coisa a se fazer é baixar o NPM, para conferir de já está baixado, basta digitar `npm -v` e conferir se está tudo certo.

- **Iniciando o pacote NPM**
    
    Basta entrar no diretório em que o NPM deve ser instalado, e digitar `npm init -y`, após isso, deve-se entrar no *package.json* criado e editar se necessário.
    
- **Configurando o package.json**
    
    Inicialmente, deve-se editar o nome do projeto, tomando cuidado nessa escolha, a versão, o main, que normalmente é *index.js,* o autor e a licença, o resto é alterado durante a criação do projeto.
    
- **Utilizando módulos de terceiros**
    
    Basta digitar no terminal `npm i modulo`, por exemplo `npm i cfonts`, assim estendemos as funcionalidades do programa, existem milhões de módulos no repositório do NPM, após isso o NPM instala um diretório e um pacote JSON.
    
    Também é possível baixar varias dependências de uma vez só, basta solicitar uma de frente pra outra separadas apenas por espaços, sem vírgulas, por exemplo,`npm i cfonts inquirer opn` .
    
    Para separar as dependências deve-se deixar um `-d` no final da solicitação, assim as dependências ficam separadas apenas para os desenvolvedores, assim, não será baixado na máquina do usuário. Exemplo  `npm i cfonts inquirer opn -D`, no *package.json*  essas dependencias ficam como “*devdependencies”.*
    
    Para instalar alguma dependência de maneira global, basta digitar, `npm i modulo -g`, fazendo assim, a dependência ficará baixada diretamente da máquina e não será necessário baixar novamente, para conferir para onde foi o arquivo, `npm root -g`, e para desinstalar `npm uninstall modulo -g`.
    
    Ao alterar alguma dependência diretamente do *pakcage.json,* deve-se atualizar pelo terminal para salvar as mudanças, para fazer isso digite `npm update` assim será tudo atualizado.
    
    Com as dependências descritas no *package.json*, basta digitar `npm i` e tudo será baixado corretamente, sem especificar o nome dos programas.
    
- **Criando e rodando Scripts**
    
    Para rodar scripts, deve-se adicionar o nome e a descrição dentro do array *script* no *package.json*, por exemplo `"start": "node index.js”`, assim, ao digitar `npm run start` ou apenas `npm start`no terminal, o *index.js* será iniciado pelo node. 
    
- **Gerenciando versões de dependências**
    
    ```json
    "keywords": [],
      "author": "",
      "license": "ISC",
    	**"dependencies":{
    	"moment": "^2.29.1"
    						2    29     1
    					major.minor.patch
    	}**
    
    ```
    
    patch: Resolvendo algum bugzinho.
    
    minor: Algumas alterações, mas não quebra a versão principal.
    
    major: Versão do projeto.
    
    ^: Ao atualizar, poderá mudar o patch e o minor.
    
    ~: Ao atualizar, poderá mudar apenas o patch.
    
    *: Ao atualizar, poderá mudar tudo.
    
    ***Não é recomendado ficar manipulando o *package.json.***
    
    `npm i modulo@1.10.1`: Escolher uma versão específica do programa.
    
    `npm outdated`: Mostra a versão atual, a mais procurada e a mais recente.
    
    `npm upgrade`: Atualiza para a versão mais procurada.
    
    `npm i modulo@latest`: Baixa a versão mais recente do modulo.
    
    `npm uninstall modulo`: Desinstala o modulo.
    

---

## Eventos

Os eventos são funções do próprio core do NodeJS, então para usar este disparador de eventos, devemos usar `EventEmitter`, que seria uma função no estilo classe.

```jsx
const {EventEmitter} = require('events')
const ev = new EventEmitter()
```

- **Emitir e ouvir eventos**
    
    ```jsx
    const { EventEmitter } = require('events')
    const ev = new EventEmitter()
    
    //ouvindo o evento
    ev.on('saySomething', (message) => {
        console.log('Eu ouvi você ', message)
    })
    
    //emitindo o evento, o evento deve ser ouvido antes de ser emitido.
    ev.emit('saySomething', 'fred')
    ev.emit('saySomething', 'João')
    //Eu ouvi você fred
    //Eu ouvi você João
    ```
    
    Também é possível ouvir o evento uma única vez, independente de quantas vezes ele foi chamado.
    
    ```jsx
    const { EventEmitter } = require('events')
    const ev = new EventEmitter()
    
    //ouvindo o evento uma única vez
    ev.once('saySomething', (message) => {
        console.log('Eu ouvi você ', message)
    })
    
    ev.emit('saySomething', 'fred')
    ev.emit('saySomething', 'João')
    //Eu ouvi você fred
    
    ```
    
- **Herdando eventos**
    
    ```jsx
    const { inherits } = require('util')
    const { EventEmitter } = require ('events')
    
    function Character(name){
        this.name = name;
    }
    
    inherits(Character, EventEmitter)
    
    const chorao = new Character('Charlie Brow')
    chorao.on('war', () => console.log(`Um homem quando está em paz não quer guerra com ninguém. ${chorao}`))
    
    chorao.emit('war')
    ```
    
- **Alterações**
    
    Ao fazer alterações no file do server, o node deve ser parado e retornado, depois de um tempo esse processo repetitivo gasta muito tempo, para evitar esse tempo gasto sem necessidade utilizamos o *nodemon*, ele vigia alterações e quando a página é salva a recarrega. Para baixalo: `npm i nodemon -D`, após isso, deve ser adicionado o script `"dev": "nodemon src/index.js”`, no *package.json,* depois é só inciar o `npm run dev`.
    

---

## NodeJS + EJS

EJS é uma linguagem de modelagem para criação de páginas HTML usando JS.

`npm init -y` `npm install ejs` `npm install express`: cria um servidor e renderiza os arquivos para serem mostrados no navegador.

- **Servidor**
    
    Criar um arquivo *server.js* com as rotas e a porta.
    
    ```jsx
    const express = require('express')
    const app = express();
    
    app.get("/", (request, response) =>{
        return response.send("Hello World")
        //este é um exemplo, normalmente seria retornado em formato de JSON
    })
    app.get("/sobre", (request, response) =>{
        return response.json({message: "Hello World"})
        //em formato de JSON
    })
    
    app.listen(3333)
    console.log('http://localhost:3333/')
    ```
    
- **Páginas**:
    
    Organiza em *partials* e *pages*.
    
    - ***partials***: contém seções de páginas que podem aparecer em diversas páginas, como o head, header e footer. Cada arquivo contém o código HTML condizente com sua função.
    - ***pages***: são arquivos HTML que representam as páginas, devem ser envolvidos com a estrutura HTML tradicional (`<!DOCTYPE html><html lang="pt-br"></html>`). Em seu interior, podem importar seções prontas do *partials* utilizando: `<%- include(<"partialName">); %>`.
    
    ---

## API Rest

### O que é API?

- Aplication Programming Interface (Interface de Programação de Aplicativos)
- Conjunto de especificações de possíveis interações entre aplicações
- Documentação para desenvolvedor

### O que é REST?

- Representation State Transfer (Transferência Representacional de Estado)
- Modelo de Arquitetuta
    - O rest não é uma linguagem, é um modelo de arquitetura.
- **6 Regras**
    - **Client-server**
        - De um lado o servidor e do outro o cliente, ou seja, o cliente não se preocupa com o server, e nem o server se importar com o cliente.
    - **Stateless**
        - O cliente pode realizar quantas requisições ele quiser para o servidor, porém o mesmo não armazena nenhuma dessas requisições.
    - **Cache**
        - Toda API deve ter suporte ao cache.
    - **Interface Uniforme**
        - Identificação dos recursos
        - Representação dos recursos
        - Mensagens auto-descritivas
        - HATEOAS (Hypertext As The Engine Of Aplication State)
    - **Camadas**
    - **Código sob demanda**

## Métodos de Requisições - HTTP Verbs

- GET - Buscar informações dentro do servidor
    
    ```jsx
    app.get("/courses", (request, response) =>{
        return response.json(["Curso 1", "Curso 2", "Curso 3"]);
    })
    ```
    
- POST - Inserir uma informação no servidor
    
    ```jsx
    app.post("/courses", (request, response) =>{
        return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
    })
    ```
    
- PUT - Alterar uma informação no servidor
    
    ```jsx
    app.put("/courses/:id", (request, response) =>{
        return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
    })
    ```
    
- DELETE - Deletar uma informação no servidor
    
    ```jsx
    app.delete("/courses/:id", (request, response) =>{
        return response.json(["Curso 6", "Curso 3", "Curso 4"]);
    })
    ```
    
- PATCH - Alterar uma informação específica
    
    ```jsx
    app.patch("/courses/:id", (request, response) =>{
        return response.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
    })
    ```
    

## HTTP Codes

- **1XX**: Informativo - a solicitação foi aceita ou o processo continua em andamento;
- **2XX**: Confirmação
    - 200 - Requisição bem sucedida
    - 201 - Created - Geralmente usado para POST após uma inserção
- **3XX**: Redirecionamento
    - 301 - Moved Permantly
    - 302 - Moved
- **4XX**: Erro do cliente
    - 400 - Bad request
    - 401 - Unauthorized
    - 402 - Forbidden
    - 404- Not Found
    - 422 - Unprocessable Entity
- **5XX**: Erro no servidor - o servidor falhou ao concluir a solicitação.
    - 500 - Internal server error
    - 502 - Bad gateway

## Parâmetros das Requisições

- Header Params
    
    ```jsx
    authority: app.nomedoapp.com.br
    method: GET
    path: /api/journey-nodes
    scheme: https
    referer: https://app.nomedoapp.com.br/node/
    ```
    
- **Query Params**
    - https://enderecoservidor.com.br/v1/userspage=2&limit=50
    - Chave: page, limit
    - Valor: 2, 50
    - Separação: &
    
    ```jsx
    app.get("/courses", (request, response) =>{
        const query = request.query;
        console.log(query)
        return response.json(["Curso 1", "Curso 2", "Curso 3"]);
    })
    //as chaves e os valores são especificados no insomnia.
    //no terminal apareceria os valores ditos, no caso:
    //{ page: '1', order: 'asc' }
    ```
    
- **Route Params**
    - Servem para identificar um recurso, editar, deletar, buscar.
    - https://enderecoservidor.com.br/users/***{id}***
    
    ```jsx
    app.put("/courses/:id", (request, response) =>{
        const params = request.params;
        console.log(params)
        return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
    })
    //o id é especificado no insomnia
    ```
    
- **Body Params**
    - Inserção/alteração
    
    ```jsx
    app.use(express.json())
    //deve ser especificado o json
    app.post("/courses", (request, response) =>{
        const body = request.body;
        console.log(body)
        return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
    })
    //no terminal
    //{ name: 'fred', sobrenome: 'nogueira' }
    ```
    
    ```jsx
    //no insomnia
    {
    	"name": "fred",
    	"sobrenome": "Nogueira"
    }
    ```
    

---

## Utilizando Insomnia

Primeiramente deve-se criar uma nova *Colection* com o nome do projeto, depois é ideal adicionar um *environment* com a *url* do *host* para adiantar o processo. Então já podemos começar criando a primeira *request* usando o comando *ctrl + n,* após isso, adicionamos a base *url* e o método e é só rodar (se der errado pode ser porque você esqueceu de ligar o *nodemon* (lembrar também de colocar o id se necessário.)).