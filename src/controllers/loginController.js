const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("logado");
  return res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    console.log(login);

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Seu usuário foi criado com sucesso");
    req.session.save(function () {
      return res.redirect("back");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();
    console.log(login);

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Você logou com sucesso!");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("back");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
