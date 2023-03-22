const express = require('express');
const router = express.Router();

// incorporar controllers
const ctrlUsers = require('../controllers/users');

/* GET users listing. */
router.get('/', ctrlUsers.users);

/* Creación de usuarios - render de la vista users_add */
router.get('/add', ctrlUsers.addUsers);

/* Creación de usuarios - petición HTT POST /users */
router.post('/add', ctrlUsers.doAddUsers);

/* GET users create. */
router.get('/create', ctrlUsers.createUsers);

/* GET users read. */
router
        .route('/search')        
        .get(ctrlUsers.readUsers)
        .post(ctrlUsers.callSearch);

router
        .route('/search/:userId')      
        .get(ctrlUsers.userFindName);

/* GET users update. */
router.get('/update', ctrlUsers.addUsers);

/* GET users listing. */
router.get('/list', ctrlUsers.users);

/* GET users update. */
router
       .route('/update/:userId')
       .get(ctrlUsers.updateUsers)     // 1. Encontrar el documento y mostrarlo en el formulario
       .post(ctrlUsers.doUpdateUsers); // 2. Eliminar el documento

/* GET users delete. */
router
       .route('/delete/:userId')
       .get(ctrlUsers.deleteUsers)     // 1. Encontrar el documento y mostrarlo en el formulario
       .post(ctrlUsers.doDeleteUsers); // 2. Eliminar el documento

module.exports = router;
