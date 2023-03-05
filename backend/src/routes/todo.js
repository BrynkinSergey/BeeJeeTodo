const express = require('express');
const router = express.Router();
const { todo }  = require('../controllers');
const verifyJwt = require('../middlewares/jwt-validation')

router.get('/:page', todo.getPage);
router.post('/', todo.create);
router.put('/:todoId', verifyJwt)
router.put('/:todoId', todo.update);

module.exports = router;