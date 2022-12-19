// const HomeModel = require('./../models/HomeModel')

// HomeModel.create({
//     title: 'Algum outro titulo aqui',
//     descricao: 'Alguma outra descrição aleatória aqui'
// })
// .then( (dados)=> console.log(dados))
// .catch(e => console.log(e))

exports.index = (req, res) => {
  res.render("index");
};
