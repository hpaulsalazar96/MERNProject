const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre : { 
        type : String,
        require: true
    },
    apellido : { 
        type : String,
        require: true
    },
    identificacion : { 
        type : Number,
        require: true
    },
    direccion : { 
        type : String,
        require: true
    },
    telefono : { 
        type : Number,
        'default': 1234567891
    },
    edad : { 
        type : Number,
        min: 1,
        max: 100,
    },
    materias : { 
        tipo : {
            type : String,
            enum: ['Presencial', 'Virtual']
        },
        nombres: [String]
    },
    carrera : { 
        type : String,
        require: true
    },
    creado : { 
        type : Date,
        'default': Date.now
    },
})

const Usuario = new mongoose.model('user', usuariosSchema);

const user = new Usuario({
    nombre : "Carlos",
    apellido : "Delgado",
    identificacion : 1993452757,
    direccion : "Quito",
    telefono : 883252585,
    edad : 35,
    materias : {
        tipo: "Presencial",
        nombres: ["Web3", "Typo1"]
    },
    carrera : "Desarrollo web",
})

//user.save();