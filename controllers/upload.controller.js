import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'

const { Entry, Topic } = require('../database/models/')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'The file is not valid - only image files are allowed!'
    return cb(new Error('only image files are allowed!'), false)
  }
  cb(null, true)
}

async function singleUpload (req, res) {
  // 'profile_pic' is the name of our file input field in the HTML form
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile')

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.status(400).json({ message: `${req.fileValidationError}` })
    } else if (!req.file) {
      return res.status(400).json({ message: 'Please select a file for upload.' })
    } else if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err })
    } else if (err) {
      return res.status(500).json({ message: err })
    }

    // Display uploaded image for user validation
    res.status(200).json({ message: `You have uploaded this file: ${req.file.path}.` })
  })
}

async function multiUpload (req, res) {

}

async function dbUpload (req, res) {

}

export { singleUpload, multiUpload, dbUpload }
