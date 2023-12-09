const { alunos, media } = require("../banco-de-dados");

const consultarNotas = (req, res) => {
    const { senha, id_aluno } = req.query
    const { materia, bimestre } = req.body
    if (!id_aluno) {
        return res.status(400).json({ "mensagem": "Precisa informar o ID do aluno!" })
    }
    if (!senha) {
        return res.status(400).json({ "mensagem": "Precisa informar a senha!" })
    }
    if (!materia) {
        return res.status(400).json({ "mensagem": "Precisa informar a matéria!" })
    }
    const aluno = alunos.find((encontrarAluno) => {
        return encontrarAluno.id_aluno === Number(id_aluno)
    })
    if (!aluno) {
        return res.status(400).json({ "mensagem": "Aluno não encontrado!" })
    }
    if (String(senha) !== String(aluno.senha)) {
        return res.status(400).json({ 'mensagem': 'Senha incorreta!' })
    }
    const procurarMateria = aluno.notas.filter((materiaProcurada) => {
        return materiaProcurada.materia === materia
    })
    if (procurarMateria.length === 0) {
        return res.status(400).json({ "mensagem": "Nenhuma nota cadastrada para essa matéria!" })
    }
    const procurarPorBimestre = aluno.notas.filter((bimestres) => {
        return bimestres.bimestre === Number(bimestre)
    })
    console.log(procurarPorBimestre);
    if (procurarPorBimestre.length === 0) {
        return res.status(400).json({ "mensagem": `Nenhuma nota cadastrada nesse bimestre para ${materia}!` })
    }

    // tudo ok, agora falta colocar as implementações das notas, com as medias 
    let notaMensal = ''
    let notaBimestral = ''
    const separarNotaMensal = procurarPorBimestre.find((mensal) => {
        notaMensal = mensal.nota
        return mensal.tipoDeNota === 'mensal'
    })
    const separarNotaBimestral = procurarPorBimestre.find((bimestral) => {
        notaBimestral = bimestral.nota
        return bimestral.tipoDeNota === 'bimestral'
    })
    let mediaAtual = media
    if (!separarNotaBimestral) {
        const notaNecessaria = ((mediaAtual * 2) - notaMensal).toFixed(2)
        return res.status(200).json({ "mensagem": `Nota mensal: ${notaMensal}, precisa tirar ${notaNecessaria} na bimestral para ficar na média!` })
    }
    else if (separarNotaBimestral && !separarNotaMensal) {
        const notaNecessaria = ((mediaAtual * 2) - notaBimestral).toFixed(2)
        return res.status(200).json({ "mensagem": `Nota Bimestral: ${notaBimestral}, precisa tirar ${notaNecessaria} na mensal para ficar na média!` })
    }
    else {
        const mediaNaMateria = ((notaMensal + notaBimestral) / 2).toFixed(2)
        if (mediaNaMateria >= mediaAtual) {
            return res.status(200).json({ "mensagem": `Você ficou com ${mediaNaMateria} na média, você passou nesse bimestre!` })
        } else {
            return res.status(200).json({ "mensagem": `Você ficou com ${mediaNaMateria} na média, você reprovou nesse bimestre!` })
        }
    }









}



module.exports = {
    consultarNotas
}