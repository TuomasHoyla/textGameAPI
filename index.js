
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Items  = require('./items')
const initialState = require('./initialState')
const { actions, view } = require('./actions')
const { getView } = require('./utils')

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const game = (playerName) => {

  const state = initialState.init(playerName)

  return {...state, ...view(state), ...actions(state)}
}

indy = game('Henkilö')

app.get('/', function (req, res) {
  res.json(indy.getSituation())
})

app.get('/n', (req, res) => {
  return res.json(indy.moveTo(0))
})

app.get('/s', (req, res) => {
  return res.json(indy.moveTo(1))
})

app.get('/e', (req, res) => {
  return res.json(indy.moveTo(2))
})

app.get('/w', (req, res) => {
  return res.json(indy.moveTo(3))
})

app.get('/take/:id', (req, res) => {

  const id = Number(req.params.id)

  res.json(indy.takeItem(id))
})

app.get('/drop/:id', (req, res) => {

  const id = Number(req.params.id)

    res.json(indy.dropItem(id))
})

app.get('/drink/:id', (req, res) => {

  const id = Number(req.params.id)

  res.json(indy.drinkItem(id))
})

app.get('/reset', function (req, res) {

  indy = game('Henkilö') //todo deep reset

  res.json(indy.getSituation())
})
