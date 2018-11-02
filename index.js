
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Items  = require('./items')
const Locations = require('./locations')

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server runnink on port ${PORT}`)
})


const getItem = (id) => { return Items.find(item => item.id === id)}
const getItems = (ids) => {return ids.map(id => getItem(id))}
const getLocationItems = (itemIds) => {return itemIds && Object.keys(itemIds).length > 0 ? getItems(itemIds) : []}
const getLocation = (id) => {

      return {
        room : Locations.rooms.find(location => location.id === id),
        locationItems: getLocationItems(Locations.rooms.find(location => location.id === id).itemIds),
      }
}

const View = (state) => ({
    getSituation: () => {
        return {
          health: state.health,
          stamina: state.stamina,
          location: getLocation(state.locationId),
          inventory: getItems(state.inventoryItemIds),
          message : 'You are still.'
        }
    }
})

const canMove = (state) => ({
    moveTo: (direction) => {
        state.locationId = direction
        return {...state, message : ('You move to: ' + direction)}
    }
})

const protagonist = (name) => {

  let state = {
    name,
    health: 100,
    stamina: 100,
    locationId: 1,
    visited: [1],
    inventoryItemIds: [1],
    message: null,
  }

  return Object.assign(state, View(state), canMove(state));
}

indy = protagonist('Henkilö')

app.get('/', function (req, res) {
  res.json(indy.getSituation())
})

app.get('/n', (req, res) => {

  indy.moveTo(2)

  return res.json(indy.getSituation())
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

app.get('/drink/:id', (req, res) => {

  const id = Number(req.params.id)

  res.json(game.drinkItem(id))
})
