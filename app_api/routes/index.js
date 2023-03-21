const express = require('express');
const router = express.Router();

//controllers imports
const ctrlUsers = require('../controllers/users')

router
    .route('/users')
    .post(ctrlUsers.userCreate)
    .get(ctrlUsers.userList);

    router
    .route('/users/:userid')
    .get(ctrlUsers.userRead)
    .put(ctrlUsers.userUpdate)
    .delete(ctrlUsers.userDelete);

router
    .route('/search/:name')
    .get(ctrlUsers.userFindName); // Búsqueda por nombre

module.exports = router;

