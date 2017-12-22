const express   = require('express');
const route     = express.Router();
const axios     = require('axios');
const translate = require('google-translate-api');

route.post('/', (req, res) => {
  let data = {
    "requests": [
      {
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ],
        "image": {
          "source": {
            "imageUri": `${req.body.url}`
          }
        }
      }
    ]
  }

  let form = req.body.from;
  axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAibT8Pw6eqeGaYwclguylFEqqD8tHuuMw',
  data)
  .then((result) => {
    translate(result.data.responses[0].textAnnotations[0].description.replace(/\n/gi,' '), {to: form}).then(respon => {
      res.status(200).json({
        msg  : 'sukses',
        data : respon.text
      }) 
    }).catch(err => {
        console.error(err);
    });
  })
  .catch(err=>{
    res.status(500).json(err);
  })
})

module.exports = route; 