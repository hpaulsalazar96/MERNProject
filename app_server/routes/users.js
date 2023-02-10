const express = require('express');
const router = express.Router();

//controllers imports
const ctrlUsers = require('../controllers/users')

/* GET users page. */
router.get('/', ctrlUsers.index);



module.exports = router;