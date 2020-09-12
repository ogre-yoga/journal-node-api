
const { Entry, Topic } = require('../database/models/')

async function index (req, res) {
  try {
    const entries = await Entry.findAll({
      include: {
        model: Topic,
        attributes: ['label', 'id'],
        through: {
          attributes: []
        }
      }

    })
    return res.status(200).json({ entries })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function create (req, res) {
  try {
    const { title, body } = req.body

    const entry = await Entry.create({
      title,
      body
    })

    return res.status(201).json({ entry })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function show (req, res) {
  try {
    const entry = await Entry.findOne({
      where: { id: req.params.id },
      include: {
        model: Topic,
        attributes: ['label', 'id'],
        through: {
          attributes: []
        }
      }
    })

    if (!entry) {
      return res.status(404).json({ message: `Entry with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ entry })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function update (req, res) {
  try {
    const { title, body } = req.body
    const entries = await Entry.update(
      {
        title,
        body
      },
      {
        where: { id: req.params.id }
      }
    )

    if (entries[0] === 0) {
      return res.status(404).json({ message: `Entry with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ message: `Entry with id ${req.params.id} successfully updated.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function destroy (req, res) {
  try {
    const entry = await Topic.destroy({ where: { id: req.params.id } })

    if (!entry) {
      return res.status(404).json({ message: `Entry with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ message: `Entry with id ${req.params.id} successfully deleted.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function addTopicToEntry (req, res) {
  try {
    console.log(req.body.topicId)

    const entry = await Entry.findOne({
      where: { id: req.params.id }
    })

    if (entry[0] === 0) {
      return res.status(404).json({ message: `Entry id ${req.params.id} not found.` })
    }

    const topic = await Topic.findOne({
      where: { id: req.body.topicId }
    })

    if (topic[0] === 0) {
      return res.status(404).json({ message: `Topic id ${req.body.topicId} not found.` })
    }

    const reference = await entry.addTopic(req.body.topicId)

    return res.status(200).json({ message: `Entry id ${req.params.id} added Topic id ${req.body.topicId}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function removeTopicFromEntry (req, res) {
  try {
    console.log(req.body.topicId)

    const entry = await Entry.findOne({
      where: { id: req.params.id }
    })

    if (entry[0] === 0) {
      return res.status(404).json({ message: `Entry id ${req.params.id} not found.` })
    }

    const topic = await Topic.findOne({
      where: { id: req.body.topicId }
    })

    if (topic[0] === 0) {
      return res.status(404).json({ message: `Topic id ${req.body.topicId} not found.` })
    }

    const reference = await entry.removeTopic(req.body.topicId)

    return res.status(200).json({ message: `Entry id ${req.params.id} removed Topic id ${req.body.topicId}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { index, create, show, update, destroy, addTopicToEntry, removeTopicFromEntry }
