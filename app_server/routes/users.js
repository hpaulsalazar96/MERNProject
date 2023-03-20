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
router.get('/create', ctrlUsers.usersCreate);

/* GET users read. */
router.get('/read', ctrlUsers.usersRead);

/* GET users update. */
router.get('/update', ctrlUsers.usersUpdate);

/* GET users delete. */
router.get('/delete', ctrlUsers.usersDelete);

module.exports = router;
