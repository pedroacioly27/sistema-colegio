let { alunos, media, diretor, idAluno, professores, idProfessor } = require("../banco-de-dados");



const listarAlunos = (req, res) => {
    return res.status(200).json(alunos)
}
const listarProfessores = (req, res) => {
    return res.status(200).json(professores)
}


const cadastrarAluno = (req, res) => {
    const { nome, serie, senha } = req.body

    if (!nome) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o nome do aluno' })
    }
    if (!serie) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a serie do aluno' })
    }
    if (!senha) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a senha do aluno' })
    }

    const alunoCadastrado = {
        id_aluno: idAluno++,
        nome,
        senha,
        serie,
        notas: []
    }
    alunos.push(alunoCadastrado)
    return res.status(201).json({ 'mensagem': 'Aluno cadastrado com sucesso!' })

}

const cadastrarProfessor = (req, res) => {
    const { nome, materia, senha } = req.body

    if (!nome) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o nome do professor' })
    }
    if (!materia) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a materia do professor' })
    }
    if (!senha) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a senha do professor' })
    }

    const professorCadastrado = {
        id_professor: idProfessor++,
        nome,
        materia,
        senha
    }
    professores.push(professorCadastrado)
    return res.status(201).json({ 'mensagem': 'Professor cadastrado com sucesso!' })

}

const deletarProfessor = (req, res) => {
    const { id_professor } = req.body
    if (!id_professor) {
        res.status(400).json({ 'mensagem': 'Precisa informar o ID do professor' })
    }
    const professor = professores.find((professor) => {
        return professor.id_professor === Number(id_professor)
    })
    if (!professor) {
        return res.status(404).json({ 'mensagem': 'Professor não encontrado' })
    }
    professores = professores.filter((professor) => {
        return professor.id_professor !== Number(id_professor)
    })
    return res.status(200).json({ "mensagem": "Professor deletado com sucesso!" })
}


const deletarAluno = (req, res) => {
    const { id_aluno } = req.body
    if (!id_aluno) {
        return res.status(400).json({ "mensagem": "Precisa informar o ID do aluno!" })
    }
    const aluno = alunos.find((encontrarAluno) => {
        return encontrarAluno.id_aluno === Number(id_aluno)
    })
    if (!aluno) {
        return res.status(400).json({ "mensagem": "Aluno não encontrado!" })
    }
    alunos = alunos.filter((aluno) => {
        return aluno.id_aluno !== Number(id_aluno)
    })
    return res.status(200).json({ "mensagem": "Aluno deletado com sucesso!" })
}



module.exports = {
    listarAlunos,
    listarProfessores,
    cadastrarAluno,
    cadastrarProfessor,
    deletarProfessor,
    deletarAluno
}