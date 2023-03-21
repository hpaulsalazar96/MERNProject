const mongoose = require('mongoose');
const users = mongoose.model('user');


// Crea un nuevo documento
const userCreate = (req, res) => {
    users.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        materias: {
            tipo: req.body.tipo,
            nombres: req.body.nombres // ya que viene en formato arreglo desde la vista
        },
        carrera: req.body.carrera
    }, (err, objetoUsuario) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoUsuario);
        }
    });
};

const userList = (req, res) => {
    users
        .find()
        .exec((err, objetoUsuario)=>{
            if(!objetoUsuario){
                console.log(`usuarios no encontrados)`);
                return res
                    .status(404)
                    .json({"mensaje" : "usuarios no encontrados"})
            }else if(err){
                console.log(`usuarios tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(objetoUsuario);
        })
    //res
    //    .status(200)
    //    .json({
    //        "status": "listed successfully"
    //    });
}

const userRead = (req, res) => {
    users
        .findById(req.params.userid)
        .exec((err, objetoUsuario)=>{
            if(!objetoUsuario){
                console.log(`usuario especificado: ${req.params.userid} no encontrado)`);
                return res
                    .status(404)
                    .json({"mensaje" : "usuario no encontrado"})
            }else if(err){
                console.log(`usuario especificado: ${req.params.userid} tiene errores)`);
                return res
                    .status(404)
                    .json(err);
            }
            res
            .status(200)
            .json(objetoUsuario);
        })
}

// Búsqueda por nombre/apellido/identificación 
const userFindName =(req, res)=> {
    const buscar = new RegExp(req.params.name); // permite buscar la ocurrencia de un texto en un campo. Ej.: parte de un nombre
    console.log ('Buscar usuario con nombre: ', buscar)
    users
        // .find({ 'nombre' : buscar }) // búsqueda por ocurrencia
        .find({ 
            'identificacion' : req.params.name // permite buscar el valor exacto en un campo. Ej.: el valor de la identificación
        }) // obtener todos los documentos de la coleccion que cumplen con el criterio de busqueda
        .exec((err, objetoUsuario)=>{
            if (!objetoUsuario){ // valido la existencia de documentos en la colección
                console.log(`No existen documentos con nombre ${buscar}`);
                return res // respondo el mensaje en formato JSON y status HTTP 404
                    .status(404) 
                    .json({"Mensaje: ":"Usuario no encontrado con nombre: ", buscar});
            } else if (err) { // find encontró un error
                console.log(`Se encontró un error en la colección ${users} con nombre: ${buscar}`);
                return res  // respondo el error en formato JSON y status HTTP 404
                    .status(404)
                    .json(err);                
            }
            console.log("Se encontró el documento con nombre: ", req.params.name);
            res  // respondo los documentos encontrados en formato JSON y status HTTP 200
                .status(200)
                .json(objetoUsuario);
        })
}

//Versión final de Actualizar Usuario con userid
const userUpdate = (req, res) => {
    if (!req.params.userid) {
        return res
            .status(404)
            .json({
                "message": "Ingrese un userid válido"
            });
    }
    users
        .findById(req.params.userid)
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) {
                return res
                    .status(404)
                    .json({
                        "message": "userid no existe"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            objetoUsuario.nombre = req.body.nombre;
            objetoUsuario.apellido = req.body.apellido;
            objetoUsuario.identificacion = req.body.identificacion;
            objetoUsuario.direccion = req.body.direccion;
            objetoUsuario.telefono = req.body.telefono;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.materias.tipo = req.body.tipo;
            objetoUsuario.materias.nombres = req.body.nombres;
            objetoUsuario.carrera = req.body.carrera;

            objetoUsuario.save((err, users) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(users);
                }
            });
        });
};

const userDelete = (req, res) => {
    if (req.params.userid) {
        users
            .findByIdAndDelete(req.params.userid)
            .exec((err, objetoUsuario) => {
                if (!objetoUsuario) { // findByIdAndDelete no encontró un documento que cumpla con userid
                    console.log(`Usuario con el userid: ${req.params.userid} no encontrado`);
                    return res 
                        .status(404)
                        .json({"mensaje": "Usuario no encontrado"});
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    }
};

module.exports = {
    userCreate, 
    userList,
    userRead,
    userUpdate,
    userDelete,
    userFindName
}