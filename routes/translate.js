const express = require('express');
const router = express.Router();
const Translate = require('../controllers/translate')
/* GET users listing. */
router.get('/', Translate.get)
router.get('/:id', Translate.getSingle)
router.post('/', Translate.create)

module.exports = router;
