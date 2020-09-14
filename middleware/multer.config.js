import multer from 'multer'
import path from 'path'

const fileType = require('file-type')
const readChunk = require('read-chunk')

let storedFileRoute

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    const modifiedFileName = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    storedFileRoute = 'uploads/' + modifiedFileName
    cb(null, modifiedFileName)
  }
})

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'The file is not valid - only image files are allowed!'
    // return cb(new Error('only image files are allowed!'), false)
  }
  cb(null, true)
}

const pdfFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
    req.fileValidationError = 'The file is not valid - only PDFs are allowed!'
    // return cb(new Error('only image files are allowed!'), false)
  }
  cb(null, true)
}

// [TODO] Examine the first 30 chars of file to get 'magic number' and verify file format
function isFileValid (req, res, next) {
  readChunk(storedFileRoute, 0, 30)
    .then((value, error) => {
      if (!value || error) return res.sendStatus(500)
      fileType.fromBuffer(value).then((value, error) => {
        if (!value || error) return res.sendStatus(500)
        console.log(value) // This is the MimeType from Magic Number.
      })
    })
  next()
}

const one = multer({ storage: storage, fileFilter: imageFilter })
const pdf = multer({ storage: storage, fileFilter: pdfFilter })
const multiple = multer({ storage: storage, fileFilter: imageFilter })
const dbstorage = multer({ storage: storage, fileFilter: imageFilter })

export { one, pdf, multiple, dbstorage, isFileValid }
