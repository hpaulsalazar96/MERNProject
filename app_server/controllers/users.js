//controllers

let usuarios = [
    {
        nombre: 'Jorge',
        apellido: 'Mian',
        direccion:"Quito",
    },
    {
        nombre: 'Tom',
        apellido: 'QW',
        direccion:"Quito",
    },
    {
        nombre: 'Felipe',
        apellido: 'Asd',
        direccion:"Quito",
    },
    {
        nombre: 'Pedro',
        apellido: 'Verna',
        direccion:"Quito",
    },
]

const index = (req, res, next) => {
    res.render('users', { 
        title: 'Users',
        usuarios
    });
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