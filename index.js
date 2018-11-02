
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Items  = require('./items')
const Locations = require('./locations')
const tools = require('./ItemHandling/tools')

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const getItem = (id) => { return Items.find(item => item.id === id)} //todo use state.items instead
const getItems = (ids) => {return ids.map(id => getItem(id))}
const getRoomItems = (itemIds) => {return itemIds && Object.keys(itemIds).length > 0 ? getItems(itemIds) : []}
const getLocation = (state) => {

      return {
        room : state.locations.rooms.find(location => location.id === state.locationId),
        roomItems: getRoomItems(state.locations.rooms.find(location => location.id === state.locationId).itemIds),
      }
}

const getView = (state) => {
  return {
    health: state.health,
    stamina: state.stamina,
    location: getLocation(state),
    inventory: getItems(state.inventoryItemIds),
    map : tools.drawMap(state.locationId, state.visited, Locations.map),
    message : 'You are still.'
  }
}

const View = (state) => ({
    getSituation: () => {
        return getView(state)
      }
})

const actions = (state) => ({
    moveTo: (direction) => {

      const location = getLocation(state).room

      if (location && location.exitIds[direction] !== null) {

        state.locationId = location.exitIds[direction]

        //mark as visited for map
        ! state.visited.includes(location) && state.visited.push(state.locationId)

        return {...getView(state), message : ('You enter to ' + getLocation(state).room.name)}

      }
      return { ...getView(state), message: 'You cannot go there'}
    },

    takeItem: (itemId) => {

      if (getLocation(state).roomItems.includes(getItem(itemId)) && getItem(itemId).isTakeable) {

          //pick up
          state.inventoryItemIds.push(itemId)

          const index = getLocation(state).room.itemIds.indexOf(itemId)

          if (index > -1) {
            //remove from ground
            getLocation(state).room.itemIds.splice(index, 1)
          }

          return { ...getView(state), message: 'You took ' + getItem(itemId).name }
      }
      return {...getView(state), message: 'no such item' }
    },

    dropItem: (itemId) => {

      const index = state.inventoryItemIds.indexOf(itemId);

      if (index > -1) {

      //add to ground
      getLocation(state).room.itemIds.push(itemId)

      //remove from hand
      state.inventoryItemIds.splice(index, 1)

      return { ...getView(state), message: 'You dropped ' + getItem(itemId).name }
    }
    return { ...getView(state), message: 'No such item' }
  },

  drinkItem: (itemId) => {

    const index = state.inventoryItemIds.indexOf(itemId)

    if (index > -1) {
      const item = getItem(itemId)

      if (item.isEdible === false) {
        return { ...getView(state), message: 'You might not want to drink that' }
      } else if (item.isActive === false) {
        return { ...getView(state), message: 'You try to squeeze a drop, but nope'}
      }

      item.isActive = false
      item.text = 'It is empty'
      state.health = 100

      return { ...getView(state), message: 'You consume ' + item.name}
    }
    return { ...getView(state), message: 'No such item' }
  },

  resetState: () => {

    state.health = 50
    state.stamina = 100
    state.locationId = 1
    state.visited = [1]
    state.inventoryItemIds = [3]
    state.message = 'reset happened'
    state.locations = Locations
    state.items = Items

    return { ...getView(state), message: 'Reset.' }
  },
/*
  resetState: () => {
    state.health = 50,
    state.stamina = 100,
    state.locationId = 1,
    state.visited = [1],
    state.inventoryItemIds = [3],
    state.message = 'reset happened',
    state.locations = Locations,
    state.items = Items,

  //  return getView(state)
  },
  */

})

const protagonist = (name) => {

  let state = {
    name,
    health: 50,
    stamina: 100,
    locationId: 1,
    visited: [1],
    inventoryItemIds: [3],
    message: null,
    locations: Locations,
    items: Items,
  }

  return Object.assign(state, View(state), actions(state));
}

indy = protagonist('Henkilö')

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
  res.json(indy.resetState())
})
