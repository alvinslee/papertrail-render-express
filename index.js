require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const db = require('./db')
const redis = require('./redis')

app.use(express.json())

app.get('/database', async (req, res) => {
  console.log('GET request to /database')
  const results = await db.getAll()
  res.send(JSON.stringify(results))
})

app.post('/database', async (req, res) => {
  console.log('POST request to /database')
  await db.insert()
  res.send('OK')
})

app.delete('/database', async (req, res) => {
  console.log('DELETE request to /database')
  await db.deleteRecords(req.body.count || 1)
  res.send('OK')
})

app.get('/redis', async (req, res) => {
  console.log('GET request to /redis')
  const results = await redis.getAll()
  res.send(JSON.stringify(results))
})

app.post('/redis', async (req, res) => {
  console.log('POST request to /redis')
  await redis.insert()
  res.send('OK')
})

app.delete('/redis', async (req, res) => {
  console.log('DELETE request to /redis')
  await redis.deleteRecords(req.body.count || 1)
  res.send('OK')
})

app.get('/', async (req, res) => {
  console.log('GET request to /')
  const results = {
    database: await db.getCount()
  }
  res.send(JSON.stringify(results))
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
