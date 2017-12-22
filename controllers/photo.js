const express = require('express');
const router = express.Router();
const PhotoModel = require('../models/photo')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;
const textToImage = require('../controllers/textToImage')
googleTranslate = require('google-translate')(process.env.API_GOOGLE);

class PhotoController {
  static get(req, res) {
    PhotoModel.find()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Photos",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Photos Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    PhotoModel.findById(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single Photo",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Photo Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static create(req, res) {
    let filUpload = req.file.cloudStoragePublicUrl  || req.body.url;
    let { photo, statusFile } = req.body
    let dataPhoto = new PhotoModel({
      photo,
      statusFile
    })
    dataPhoto.save()
      .then(result => {
        textToImage.renderImage(fileUpload)
        .then(showText =>{

          googleTranslate.translate(showText , 'en', function(err, translation) {
            let dataHasilTranslate = translation.translateText
            console.log(translation.translatedText);
          });
        })
        .catch(err =>{
          console.log('INI ERROR')
        })

      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Photos Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
}

module.exports = PhotoController