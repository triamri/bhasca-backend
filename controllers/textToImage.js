const express   = require('express');
const router     = express.Router();
const axios     = require('axios');

class ImageToTextController {
  static renderImage(url){
    return new Promise((resolve, reject)=>{
      let urlRender = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDB7xBUE2MEms8Irn4hn7VcwMQA4Wjuv34`
      let data = {
        "requests": [
          {
            "image": {
              "source": {
                "imageUri": `${url}`
              }
            },
            "features": [
              {
                "type": "DOCUMENT_TEXT_DETECTION"
              }
            ]
          }
        ]
      }
      axios.post(urlRender, data)
      .then(result =>{
        let text = result.data.responses[0].fullTextAnnotation.text
        resolve(text)
      })
      .catch(err =>{
        reject(err)
      })
    })
    
  }
}

module.exports = ImageToTextController; 