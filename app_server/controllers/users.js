// controllers de users
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3010' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://hsalazar-dw3.herokuapp.com' // server remoto - produccion
};

// arreglo de datos
/*let usuarios = [
  {
    nombre: 'Tomás',
    apellido: 'Dávila',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Angel',
    apellido: 'Arregui',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Sebas',
    apellido: 'Bustillo',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Henry',
    apellido: 'Salazar',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Martín',
    apellido: 'Maldonado',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Jorge',
    apellido: 'Fierro',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Juan Pablo',
    apellido: 'Rivadeneira',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Nacho',
    apellido: 'Asadobay',
    direccion: 'Quito - Ecuador'
  },
  {
    nombre: 'Fernado',
    apellido: 'Vásconez',
    direccion: 'Quito - Ecuador'
  }
]*/

// Listado de usuarios
// 1. renderizar la vista users
  const renderUsers = (req, res, objetoUsuarios) => {
    res.render('users', 
    { 
      title: 'Página de Usuarios', 
      users: objetoUsuarios
      // nombre: objetoUsuarios[0].nombre,
      // apellido: objetoUsuarios[0].apellido,
      // direccion: objetoUsuarios[0].direccion,
      // carrera: objetoUsuarios[0].carrera
     });
  }

  // 2. peticion HTTP - GET /api/users
  const users = (req, res, next) => {
    const path = '/api/users/';
    const requestOptions = { // objeto cargado con las opciones para request
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {}
    };

    request(requestOptions, 
      (err, response, body)=>{
        if(err){
          console.log(err);
        } else if (response.statusCode === 200){
          console.log('Objeto resultante: ', body);
          renderUsers(req, res, body);
        } else {
          console.log(response.statusCode);
          res.render('error', {
            message: 'Existe un error en la colección usuarios'
          });
        }
    } );
  }

  // Creación de usuarios
  // 1. renderizar la vista users_add
  const addUsers = (req, res) => {
    res.render('users_add', {
      titulo: 'Creación de Usuarios',
      mensaje: 'Bienvenido a Creación de Usuarios'
    });
  }

  // 2. petición HTTP - POST /api/users
  const doAddUsers = (req, res) => {
    const path = '/api/users/';
    const postdata = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      identificacion: req.body.identificacion,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      edad: req.body.edad,
      tipo: req.body.tipo,
      nombres: req.body.nombres,
      carrera: req.body.carrera,
      fecha: req.body.fecha
    }

    const requestOptions = { // objeto cargado con las opciones para request
      url: `${apiOptions.server}${path}`,
      method: 'POST',
      json: postdata
    };

    request(requestOptions, 
      (err, response, body)=>{
        console.log('Opciones: ', requestOptions);
        if (response.statusCode === 201) { // creación exitosa
          console.log('Body: ', body);
          // volver a mostrar la vista users_add para el ingreso de más documentos
          res.render('users_add', {
            titulo: 'Creación de Usuarios',
            mensaje: 'Usuario creado exitosamente'
          });
        } else {
          console.log('statuscode: ', response.statusCode);
          console.log('error: ', err);
          console.log('req.body: ', req.body);
          console.log('Opciones: ', requestOptions);
          res.render('error', { message: 'Existe un error en la creación de usuarios' });
        }
      });

  }

  const createUsers = (req, res, next) => {
    res.send('Respuesta a la ruta /users/create');
  }

  const readUsers = (req, res, next) => {
    res.send('Respuesta a la ruta /users/read');
  }

  const updateUsers = (req, res, next) => {
    const path = `/api/users/${req.params.userId}`; // invoco a la ruta de la API para buscar por Id;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    }
    console.log('Ruta: ', path);
    request(
        requestOptions, // Opciones
        (err, response, body) => { // callback con sus 3 partes
            console.log('Documento: ', body);
            console.log('Status Code: ', response.statusCode);
            if (err) {
                console.log('Request encontró el error: ', err);
            } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
                console.log('Objeto Resultante: ', body);
                renderUpdateUsers(req, res, body); // llamar a la función que hace render de la vista users_delete
            } else {
                console.log('Status Code: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección usuarios'
                })
            }
        });
  }  

  const deleteUsers = (req, res) => {
    const path = `/api/users/${req.params.userId}`; // invoco a la ruta de la API para buscar por Id;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    }
    console.log('Ruta: ', path);
    request(
        requestOptions, // Opciones
        (err, response, body) => { // callback con sus 3 partes
            console.log('Documento: ', body);
            console.log('Status Code: ', response.statusCode);
            if (err) {
                console.log('Request encontró el error: ', err);
            } else if (response.statusCode === 200 && body) { // además del status code, el objeto resultante debe tener contenido
                console.log('Objeto Resultante: ', body);
                renderDeleteUsers(req, res, body); // llamar a la función que hace render de la vista users_delete
            } else {
                console.log('Status Code: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección usuarios'
                })
            }
        });
  }


  // 2. Eliminar el documento
  const doDeleteUsers = (req, res) => {
    const path = `/api/users/${req.params.userId}`; // invoco a la ruta de la API para eliminar por Id;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    }
    console.log('Ruta: ', path);
    request(
        requestOptions, // Opciones
        (err, response, body) => { // callback con sus 3 partes
            console.log('Documento: ', body);
            console.log('Status Code: ', response.statusCode);
            if (err) {
                console.log('Request encontró el error: ', err);
            } else if (response.statusCode === 204) { // delete status code
                console.log('Objeto Resultante: ', body);
                return res.redirect('/'); // retorno a la página de inicio
            } else {
                console.log('Status Code: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Existe un error en la colección usuarios'
                })
            }
        });
  }


// Eliminación de usuarios 

    // 0. Render de la vista users_delete - Mostrar Formulario
  const renderDeleteUsers = (req, res, responseBody) => {
    res.render('users_delete', {
      title: 'Eliminación de usuarios',
      mensaje: 'Bienvenido a Eliminación de usuarios',
        nombre: responseBody.nombre,
        apellido: responseBody.apellido,
        identificacion: responseBody.identificacion,
        direccion: responseBody.direccion,
        telefono: responseBody.telefono,
        edad: responseBody.edad,
        tipo: responseBody.tipo,
        nombres: responseBody.nombres,
        carrera: responseBody.carrera,
        fecha: responseBody.creado,
        documento: responseBody._id // necesario para realizar el delete
    });
  }

  // 2. Eliminar el documento
  const doUpdateUsers = (req, res) => {
    const path = `/api/users/${req.params.userId}`; // invoco a la ruta de la API para eliminar por Id;
    const postdata = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      identificacion: req.body.identificacion,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      edad: req.body.edad,
      tipo: req.body.tipo,
      nombres: req.body.nombres,
      carrera: req.body.carrera,
      fecha: req.body.fecha
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'PUT',
        json: postdata
    }
    console.log('Ruta: ', path);
    request(requestOptions, 
      (err, response, body)=>{
        console.log('Opciones: ', requestOptions);
        if (response.statusCode === 200) { // creación exitosa
          console.log('Body: ', body);
          // volver a mostrar la vista users_add para el ingreso de más documentos
          res.render('users_add', {
            titulo: 'Creación de Usuarios',
            mensaje: 'Usuario creado exitosamente'
          });
        } else {
          console.log('statuscode: ', response.statusCode);
          console.log('error: ', err);
          console.log('req.body: ', req.body);
          console.log('Opciones: ', requestOptions);
          res.render('error', { message: 'Existe un error en la creación de usuarios' });
        }
      });
  }

    // 0. Render de la vista users_update - Mostrar Formulario
    const renderUpdateUsers = (req, res, responseBody) => {
      res.render('users_update', {
        title: 'Actualizacion de usuarios',
        mensaje: 'Bienvenido a Actualizacion de usuarios',
          nombre: responseBody.nombre,
          apellido: responseBody.apellido,
          identificacion: responseBody.identificacion,
          direccion: responseBody.direccion,
          telefono: responseBody.telefono,
          edad: responseBody.edad,
          tipo: responseBody.tipo,
          nombres: responseBody.nombres,
          carrera: responseBody.carrera,
          fecha: responseBody.creado,
          documento: responseBody._id // necesario para realizar el update
      });
    }

  module.exports = {
    // Listar usuarios
    users, // 1. peticion HTTP - GET /api/users
    // Creación de usuarios
    addUsers,   // 1. renderizar la vista users_add
    doAddUsers, // 2. petición HTTP - POST /api/users
    createUsers,
    readUsers,
    updateUsers,
    doUpdateUsers,
    //renderUpdateUsers,
    deleteUsers,
    doDeleteUsers,
    //renderDeleteUsers
  }