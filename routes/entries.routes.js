import { Router } from 'express'
import { Entry } from '../database/models'

const router = Router()
const entryController = require('../controllers/entry.controller')

// http://localhost:3000/entries
router.get('/', entryController.index)
router.post('/', entryController.create)
router.get('/:id', entryController.show)
router.put('/:id', entryController.update)
router.delete('/:id', entryController.destroy)
router.post('/:id/addTopic', entryController.addTopicToEntry)
router.post('/:id/removeTopic', entryController.removeTopicFromEntry)

export default router
