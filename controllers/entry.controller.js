const { Entry, Topic } = require('../database/models/')

async function index (req, res) {
  try {
    const entries = await Entry.findAll()
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
      where: { id: req.params.id }
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

module.exports = { index, create, show, update, destroy }
