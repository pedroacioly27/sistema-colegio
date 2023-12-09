const { professores, alunos } = require("../banco-de-dados");


const cadastrarNota = (req, res) => {
    const { id_professor, senha } = req.query
    const { id_aluno, nota, tipoDeNota, bimestre } = req.body
    if (!id_professor) {
        res.status(400).json({ 'mensagem': 'Precisa informar o seu ID' })
    }
    const professor = professores.find((professor) => {
        return professor.id_professor === Number(id_professor)
    })
    if (!professor) {
        return res.status(404).json({ 'mensagem': 'Professor não encontrado' })
    }
    if (!senha) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a senha!' })
    }
    if (String(senha) !== String(professor.senha)) {
        return res.status(400).json({ 'mensagem': 'Senha incorreta!' })
    }
    if (!id_aluno) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o id do aluno' })
    }
    if (!bimestre) {
        return res.status(404).json({ 'mensagem': 'Precisa informar o bimestre' })
    }
    if (!nota) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a nota do aluno' })
    }
    if (!tipoDeNota) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o tipo da nota' })
    }
    if (tipoDeNota !== "bimestral" && tipoDeNota !== "mensal") {
        return res.status(400).json({ 'mensagem': 'Tipo da nota inválido' })
    }
    if (nota < 0 || nota > 10 || nota != Number(nota)) {
        return res.status(400).json({ 'mensagem': 'Nota inválida' })
    }
    if (bimestre < 0 || bimestre > 4 || bimestre != Number(bimestre)) {
        return res.status(400).json({ 'mensagem': 'Bimestre inválida' })
    }
    const aluno = alunos.find((aluno) => {
        return aluno.id_aluno === Number(id_aluno)
    })
    if (!aluno) {
        return res.status(404).json({ 'mensagem': 'Aluno não encontrado' })
    }
    const notaDoAluno = {
        id_professor: professor.id_professor,
        materia: professor.materia,
        bimestre: Number(bimestre),
        nota,
        tipoDeNota,

    }
    const verificarBimestre = aluno.notas.filter((veirificar) => {
        return veirificar.bimestre === Number(bimestre)
    })
    const verificarTipoDeNota = verificarBimestre.filter((verificar) => {
        return verificar.tipoDeNota === tipoDeNota
    })
    const verificarIdProfessor = verificarTipoDeNota.filter((verificar) => {
        return verificar.id_professor === Number(professor.id_professor)
    })

    if (verificarIdProfessor.length === 0) {
        aluno.notas.push(notaDoAluno)

        return res.status(201).json({ 'mensagem': 'Nota cadastrada com sucesso' })
    } else {
        return res.status(400).json({ 'mensagem': 'Nota já cadastrada' })
    }

}

const alterarNota = (req, res) => {
    const { id_professor, senha } = req.query
    const { id_aluno, novaNota, tipoDeNota, bimestre } = req.body
    if (!id_professor) {
        res.status(400).json({ 'mensagem': 'Precisa informar o seu ID' })
    }
    const professor = professores.find((professor) => {
        return professor.id_professor === Number(id_professor)
    })
    if (!professor) {
        return res.status(404).json({ 'mensagem': 'Professor não encontrado' })
    }
    if (!senha) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a senha!' })
    }
    if (String(senha) !== String(professor.senha)) {
        return res.status(400).json({ 'mensagem': 'Senha incorreta!' })
    }
    if (!id_aluno) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o id do aluno' })
    }
    if (!bimestre) {
        return res.status(404).json({ 'mensagem': 'Precisa informar o bimestre' })
    }
    if (!novaNota) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a nota do aluno' })
    }
    if (!tipoDeNota) {
        return res.status(400).json({ 'mensagem': 'Precisa informar o tipo da nota' })
    }
    if (tipoDeNota !== "bimestral" && tipoDeNota !== "mensal") {
        return res.status(400).json({ 'mensagem': 'Tipo da nota inválido' })
    }
    if (novaNota < 0 || novaNota > 10 || novaNota != Number(novaNota)) {
        return res.status(400).json({ 'mensagem': 'Nota inválida' })
    }
    if (bimestre < 0 || bimestre > 4 || bimestre != Number(bimestre)) {
        return res.status(400).json({ 'mensagem': 'Bimestre inválida' })
    }
    const aluno = alunos.find((aluno) => {
        return aluno.id_aluno === Number(id_aluno)
    })
    if (!aluno) {
        return res.status(404).json({ 'mensagem': 'Aluno não encontrado' })
    }
    const procurarPorBimestre = aluno.notas.filter((bimestres) => {
        return bimestres.bimestre === Number(bimestre)
    })
    if (tipoDeNota === 'mensal') {
        const separarNotaMensal = procurarPorBimestre.find((mensal) => {
            mensal.nota = novaNota
            return mensal.tipoDeNota === 'mensal'
        })
        if (!separarNotaMensal) {
            return res.status(404).json({ 'mensagem': 'Nota não encontrado' })
        }
        return res.status(201).json({ 'mensagem': 'Nota atualizada com sucesso' })
    } else {
        const separarNotaBimestral = procurarPorBimestre.find((bimestral) => {
            bimestral.nota = novaNota
            return bimestral.tipoDeNota === 'bimestral'
        })
        if (!separarNotaBimestral) {
            return res.status(404).json({ 'mensagem': 'Nota não encontrado' })
        }
        return res.status(201).json({ 'mensagem': 'Nota atualizada com sucesso' })
    }
}





module.exports = { cadastrarNota, alterarNota }