const express = require('express');
const router = express.Router();
const Photo = require('../controllers/photo')
/* GET users listing. */
router.get('/', Photo.get)
router.get('/:id', Photo.getSingle)
router.post('/', Photo.create)
router.put('/:id', Photo.update)
router.delete('/:id', Photo.destroy)

module.exports = router;
