module.exports = (error, req, res, next) => {
    console.error(error)
    const msg = typeof error == 'string' ? error : (error.mesage || 'Erro interno!')
    return res.status(error.status || 500).json({ msg, detalhes: '' })
}