import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'
const { upload } = require('../routes/uploads.routes')

const { Entry, Topic } = require('../database/models/')
const fs = require('fs')

async function singleUpload (req, res) {
  // 'image' is the name of our file input field in the HTML form

  try {
    if (req.fileValidationError) {
      return res.status(400).json({ message: `${req.fileValidationError}` })
    } else if (!req.file) {
      return res.status(400).json({ message: 'Please select a file for upload.' })
    }
    // Display uploaded image for user validation
    res.status(200).json({ message: `You have uploaded this file: ${req.file.path}.` })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function multiUpload (req, res) {
  // 5 is the limit I've defined for number of uploaded files at once
  // 'collection' is the name of our file input field

  try {
    if (req.fileValidationError) {
      return res.status(400).json({ message: `${req.fileValidationError}` })
    } else if (!req.files.length) {
      return res.status(400).json({ message: 'Please select files(s) for upload.' })
    }
    // Display uploaded image for user validation
    let result = 'You have uploaded these images: <ul>'
    const files = req.files
    let index, len

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<li>${files[index].path}</li>`
    }
    result += '</ul>'

    res.status(200).json({ message: `${result}` })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

async function dbUpload (req, res) {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ message: `${req.fileValidationError}` })
    } else if (!req.file) {
      return res.status(400).json({ message: 'Please select a file for upload.' })
    }
    // Display uploaded image for user validation
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')
    // Define a JSONobject for the image attributes for saving to database

    var finalImg = {
      contentType: req.file.mimetype,
      image: new Buffer.from(encode_image, 'base64')
    }

    res.status(200).json({ message: `You have converted this file to base64, length: ${encode_image.length}.` })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export { singleUpload, multiUpload, dbUpload }
