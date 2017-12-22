const express = require('express');
const router = express.Router();
const PhotoModel = require('../models/photo')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

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
    let { photo, statusFile } = req.body
    let dataPhoto = new PhotoModel({
      photo,
      statusFile
    })
    dataPhoto.save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Photos Created",
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

  static update(req, res) {
    let { name, merk, price, stock, image } = req.body
    PhotoModel.findByIdAndUpdate(req.params.id, { name, merk, price, stock, image })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Photo Updated",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Update Photo Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static destroy(req, res) {
    PhotoModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Photo Deleted",
          data: result
        })
      })
  }
}

module.exports = PhotoController