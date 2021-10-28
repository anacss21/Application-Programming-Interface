const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos')
const verificacao = require('./controladores/filtro')

const rotas = express();


rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificacao);
rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', usuarios.atualizarUsuario);
rotas.get('/produtos', produtos.produtosUsuario);
rotas.get('/produtos/:id', produtos.detalharProdutos);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProdutos);
rotas.delete('/produtos/:id', produtos.excluirProdutos);

module.exports = rotas;