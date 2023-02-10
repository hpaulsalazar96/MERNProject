//controllers

const index = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

module.exports = {
    index
};