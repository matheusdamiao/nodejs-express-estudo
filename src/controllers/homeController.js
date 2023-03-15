const Contato = require("./../models/ContatoModel");

exports.index = async (req, res) => {
  const contato = new Contato(req.body);
  const contatos = await contato.buscaContatos();
  return res.render("index", { contatos });
};
