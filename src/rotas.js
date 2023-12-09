const express = require('express')
const { listarAlunos, cadastrarAluno, cadastrarProfessor, listarProfessores, deletarProfessor, deletarAluno } = require('./controladores/diretores')
const { validarSenhaDiretor } = require('./controladores/intermediarios/intermediarios')
const { cadastrarNota, alterarNota } = require('./controladores/professores')
const { consultarNotas } = require('./controladores/alunos')
const rotas = express()

rotas.get('/diretor/aluno', validarSenhaDiretor, listarAlunos)
rotas.get('/diretor/professor', validarSenhaDiretor, listarProfessores)
rotas.post('/diretor/cadastrar/aluno', validarSenhaDiretor, cadastrarAluno)
rotas.post('/diretor/cadastrar/professor', validarSenhaDiretor, cadastrarProfessor)
rotas.delete('/diretor/professor', validarSenhaDiretor, deletarProfessor)
rotas.delete('/diretor/aluno', deletarAluno, validarSenhaDiretor)

rotas.post('/professor/nota', cadastrarNota)
rotas.patch('/professor/nova-nota', alterarNota)

rotas.get('/aluno/nota', consultarNotas)

module.exports = rotas