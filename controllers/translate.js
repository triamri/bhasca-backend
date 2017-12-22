const express = require('express');
const router = express.Router();
const TranslateModel = require('../models/translate')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

class TranslateController {

  static translator(text, bahasa){
    googleTranslate.translate(text , bahasa, function(err, translation) {
      if(!err) return translation.translatedText
      return err
    });
  }

  static get(req, res) {
    TranslateModel.find()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Translates",
          data: results
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Translates Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    TranslateModel.findById(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single Translate",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Translate Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static create(req, res) {
    let { idPhoto, statusRequest, data } = req.body
    let dataTranslate = new TranslateModel({
      idPhoto,
      statusRequest,
    })
    dataTranslate.save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Translates Created",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Translates Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
}

module.exports = TranslateController