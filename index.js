
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const Game = require('./game')

app.use(cors())
app.use(bodyParser.json())

let game = new Game()

app.listen(PORT, () => {
  console.log(`Server runnink on port ${PORT}`)
})

app.get('/', function (req, res) {
  res.json(game.getState())
})

app.get('/n', (req, res) => {
  return res.json(game.moveTo(0))
})

app.get('/s', (req, res) => {
  return res.json(game.moveTo(1))
})

app.get('/e', (req, res) => {
  return res.json(game.moveTo(2))
})

app.get('/w', (req, res) => {
  return res.json(game.moveTo(3))
})

app.get('/take/:id', (req, res) => {

  const id = Number(req.params.id)

  res.json(game.takeItem(id))
})

app.get('/drop/:id', (req, res) => {

  const id = Number(req.params.id)

    res.json(game.dropItem(id))
})
