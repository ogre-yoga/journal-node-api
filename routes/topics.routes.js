import { Router } from 'express'
import { Topic } from '../database/models'

const router = Router()
const topicController = require('../controllers/topic.controller')

// http://localhost:3000/api/topics
router.get('/', topicController.index)
router.post('/', topicController.create)
router.get('/:id', topicController.show)
router.put('/:id', topicController.update)
router.delete('/:id', topicController.destroy)
router.post('/:id/addEntry', topicController.addEntryToTopic)
router.post('/:id/removeEntry', topicController.removeEntryFromTopic)

export default router
