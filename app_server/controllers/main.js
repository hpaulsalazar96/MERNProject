//controllers

const index = (req, res, next) => {
    res.render('index', { title: 'Mi Express' });
  }

module.exports = {
    index
};