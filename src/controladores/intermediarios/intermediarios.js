const { diretor } = require("../../banco-de-dados")

const validarSenhaDiretor = (req, res, next) => {
    const { senha } = req.query
    if (!senha) {
        return res.status(400).json({ 'mensagem': 'Precisa informar a senha!' })
    }
    if (String(senha) !== String(diretor.senha)) {
        return res.status(400).json({ 'mensagem': 'Senha incorreta!' })
    }
    next()

}


module.exports = {
    validarSenhaDiretor
}