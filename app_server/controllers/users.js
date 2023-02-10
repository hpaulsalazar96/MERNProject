//controllers

const index = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

const userCreate = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

const userRead = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

const userDelete = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

const userUpdate = (req, res, next) => {
    res.render('users', { title: 'Users' });
  }

module.exports = {
    index,
    userCreate,
    userRead,
    userDelete,
    userUpdate,
};