const express = require('express');
const router = express.Router();
const PhotoModel = require('../models/photo')
const HttpStatus = require('http-status-codes')
const axios = require('axios');
const ObjectID = require('mongodb').ObjectID;
const textToImage = require('../controllers/textToImage')
const TranslateModel = require('../models/translate')
const googleTranslate = require('google-translate')(process.env.API_GOOGLE);

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
    let fileUpload = req.body.url || req.file.cloudStoragePublicUrl;
    console.log(fileUpload)
    let dataPhoto = new PhotoModel({
      photo: fileUpload
    })
    dataPhoto.save()
      .then(result => {
        console.log(result)
        textToImage.renderImage(fileUpload)
          .then(showText => {
            console.log(showText)
            googleTranslate.translate(showText, req.body.from, function (err, translation) {
              console.log('masuk ke translate')
              let dataHasilTranslate = translation.translatedText
              let dataTranslate = new TranslateModel({
                idPhoto: result._id,
              statusRequest: req.body.from,
                data: dataHasilTranslate
              })
              dataTranslate.save()
                .then(translateDatabase => {
                  res.status(HttpStatus.OK).json({
                    messages: "Data Translator",
                    data: dataHasilTranslate,
                    image: fileUpload
                  })
                })

            });
          })
          .catch(err => {
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