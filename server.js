require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.static('views'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database.'))

app.use(express.json())

const webRoutes = require('./routes/web')

app.use(webRoutes)

app.listen(3000, () => console.log('Server Started.'))

