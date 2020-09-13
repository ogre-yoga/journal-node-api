import { Router } from 'express'

const router = Router()
const uploadController = require('../controllers/upload.controller')

router.post('/single', uploadController.singleUpload)
router.post('/multi', uploadController.multiUpload)
router.post('/db', uploadController.dbUpload)

export default router
