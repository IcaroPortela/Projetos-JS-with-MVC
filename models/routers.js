const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');

//Banco de dados
const Database = require('./conexao.js');
const banco = new Database();
//banco.createDatabase("MeuGame");
//banco.createTable('usuario','id int not null primary key auto_increment, nome varchar(20), senha varchar(8), idade int, itens int(20), coins int(255), jews int(255)')

//Consumindo a função bodyparser para pegar os valores no formulário
routers.use(bodyParser.urlencoded({
    extended: false
}));
routers.use(bodyParser.json());
routers.use(express.json());

//Criando as rotas para carregar as paginas

routers.get('/', (req, res)=>{
    res.sendFile(__dirname  + '/views/index.html')
})

routers.post('/', (req, res)=>{
    const s = req.body.senha
    const login = req.body.user
    const login2 = login.toUpperCase()
    if(login !== banco.selct(login) && s !== banco.selct(senha)){
        res.send("Ops! senha errada")
    }else{
        res.send("Sejá Bem-vindo ao Jogo MMORPG Grau!", `${login2}`)
        //res.send(`${user} Senha Bem-vindo! \n Você tem ${coins} e ${jews}`)
    }
    
})

routers.get('/cadastro', (req, res)=>{
    res.sendFile(__dirname + '/views/cadastro.html')
})

routers.post('/cadastro', (req, res)=>{
    const dados = {
        usuario: req.body.user,
        email: req.body.email,
        passw:req.body.senha,
        passw2: req.body.senha2,
        idade: req.body.nasc,
        itens: 0,
        coins: 1000,
        jews:100,
        sexo: req.body.sexo
    }
    banco.insert(dados.usuario, dados.passw, dados.idade, dados.itens, dados.coins, dados.jews, dados.sexo, dados.email)
}, (res, req)=>{
    res.sendFile(__dirname + '/views/index.html')
})

module.exports = routers;