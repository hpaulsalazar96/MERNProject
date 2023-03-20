const mongoose = require('mongoose');
const readLine = require('readline');

require('./esquema_usuarios')

if(process.platform === 'win32'){
    const rl = readLine.Interface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', ()=>{
        process.emit('SIGINT');
    });
}

const procShutdown = (msg, callback) =>{
    mongoose.connection.close(()=>{
        console.log('Mongoose se desconecto a traves de: ',msg);
        callback()
    });
}
 
process.on('SIGUSR2', ()=>{
    procShutdown('terminado por heroku', () =>{
        process.kill(process.pid, 'SIGUSR2');
    })
})

process.on('SIGTERM', ()=>{
    procShutdown('terminado por heroku', () =>{
        process.exit(0);
    })
})

process.on('SIGINT', ()=>{
    procShutdown('terminado por windows', () =>{
        process.exit(0);
    })
})

let dbURI = 'mongodb://localhost:27017/db_project_dw3';
mongoose.set('strictQuery', true)

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGODB_URI;
}

// Connect MongoDB at default port 27017.
mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
}).catch(err => console.log('Mongoose Error: ',err.reason));

mongoose.connection.on('connected',()=>{
    console.log(`Mongoose se conecto a: ${dbURI}`);
});

mongoose.connection.on('disconnected',()=>{
    console.log(`Mongoose se desconecto de: ${dbURI}`);
});

mongoose.connection.on('error',()=>{ 
    console.log(`Mongoose log error a: ${dbURI}`);
});