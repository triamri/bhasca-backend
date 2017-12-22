const express = require('express');
const router = express.Router();
const Photo = require('../controllers/photo')
const upload = require('../middlewares/uploadImages')

/* GET users listing. */
router.get('/', Photo.get)
router.get('/:id', Photo.getSingle)
router.post('/',
  upload.multer.single('image'),
  upload.sendUploadToGCS,
  Photo.create)
router.post('/url', Photo.create)

module.exports = router;
