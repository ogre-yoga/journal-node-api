const { Entry, Topic } = require('../database/models/')

async function index (req, res) {
  try {
    const topics = await Topic.findAll({
      include: {
        model: Entry,
        attributes: ['title'],
        through: {
          attributes: []
        }
      }
    })
    return res.status(200).json({ topics })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function create (req, res) {
  try {
    const { label, description } = req.body

    const topic = await Topic.create({
      label,
      description
    })

    return res.status(201).json({ topic })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function show (req, res) {
  try {
    const topic = await Topic.findOne({
      where: { id: req.params.id },
      include: {
        model: Entry,
        attributes: ['title'],
        through: {
          attributes: []
        }
      }
    })

    if (!topic) {
      return res.status(404).json({ message: `Topic with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ topic })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function update (req, res) {
  try {
    const { label, description } = req.body
    const topics = await Topic.update(
      {
        label,
        description
      },
      {
        where: { id: req.params.id }
      }
    )

    if (topics[0] === 0) {
      return res.status(404).json({ message: `Topic with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ message: `Topic with id ${req.params.id} successfully updated.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function destroy (req, res) {
  try {
    const topic = await Topic.destroy({ where: { id: req.params.id } })

    if (!topic) {
      return res.status(404).json({ message: `Topic with id ${req.params.id} not found.` })
    }

    return res.status(200).json({ message: `Topic with id ${req.params.id} successfully deleted.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function addEntryToTopic (req, res) {
  try {
    const { entryId } = req.body

    const topic = await Topic.findOne({
      where: { id: req.params.id }
    })

    if (topic[0] === 0) {
      return res.status(404).json({ message: `Topic with id ${req.params.id} not found.` })
    }
    console.log(topic)

    const reference = await topic.addEntry(entryId)

    return res.status(200).json({ message: `Topic with id ${req.params.id} updated.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { index, create, show, update, destroy, addEntryToTopic }
