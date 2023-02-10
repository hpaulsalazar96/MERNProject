const express = require('express');
const router = express.Router();

//controllers imports
const ctrlUsers = require('../controllers/users')

/* GET users page. */
router.get('/', ctrlUsers.index);

router.get('/create', ctrlUsers.userCreate);

router.get('/read', ctrlUsers.userRead);

router.get('/update', ctrlUsers.userUpdate);

router.get('/delete', ctrlUsers.userDelete);


module.exports = router;