exports.middle = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
  next();
};
