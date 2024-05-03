const express = require('express');
const { listarContas, criarConta, atualizarUsuario, excluirConta } = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');
const { validarSenha, validarContaCadastrada, validarCorpoRequisicao } = require('./intermediarios')

const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCorpoRequisicao, criarConta)
rotas.put('/contas/:numeroConta/usuario', validarCorpoRequisicao, validarContaCadastrada, atualizarUsuario)
rotas.delete('/contas/:numeroConta', validarContaCadastrada, excluirConta)

rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/transferir', transferir)
rotas.get('/contas/saldo', saldo)
rotas.get('/contas/extrato', extrato)

module.exports = rotas;
