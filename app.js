import express from 'express'
import sequelize from 'sequelize'
import bodyParser from 'body-parser'
import multer from 'multer'

import entryRoutes from './routes/entries.routes'
import topicRoutes from './routes/topics.routes'
import uploadRoutes from './routes/uploads.routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/entries', entryRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/upload', uploadRoutes)

const port = process.env.PORT || 3000

app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to The Journal API'
}))

app.listen(port, () => console.log(`Server is running on PORT ${port}`))
