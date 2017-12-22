const express = require('express');
const multer  = require('multer');
const route   = express.Router();
const axios   = require('axios');
const upload  = multer({ dest: 'uploads/'});

route.post('/', images.multer.single('file'), images.sendUploadToGCS, (req, res) => {
  
  if(!req.file.cloudStoragePublicUrl) {
    res.status(500).json({
      msg : 'err',
    })
  }
  
  let data = {
    "requests" : [
      {
        "features" : 
        [
          {
            "type" : "TEXT_DETECTION"
          }
        ],
        "image" : {
          "source" : {
            "imageUri" : `${req.file.cloudStoragePublicUrl}`
          }
        }
      }
    ]
  }
  
  axios.post('')

})

module.exports = route;