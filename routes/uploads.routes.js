import { Router } from 'express'

const router = Router()
const uploadController = require('../controllers/upload.controller')
const upload = require('../middleware/multer.config')

router.post('/single', upload.one.single('image'), uploadController.singleUpload)
router.post('/pdf', upload.pdf.single('document'), uploadController.singleUpload)
router.post('/multi', upload.multiple.array('collection', 5), uploadController.multiUpload)
router.post('/db', upload.dbstorage.single('icon'), uploadController.dbUpload)

export default router
