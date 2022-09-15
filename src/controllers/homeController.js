exports.home = (req, res) => {
    res.render('index')
}

exports.homePost = (req, res) => {
    res.send(`<h1>Este é seu nome: ${req.body.nome}</h1>`)
    console.log(`Este é seu nome: ${req.body.nome}`)
}



