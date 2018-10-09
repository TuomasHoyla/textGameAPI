
const Locations = require('./locations')
const Items  = require('./items')

function Game() {
  this.location = 1
  this.itemIds = []
  this.visited = [1]
}

Game.prototype.getState = function() {

    return {
      'location': getLocation(this.location),
      'inventory': getItems(this.itemIds),
      'map' : drawMap(this.location, this.visited, Locations.map),
      'message' : null,
    }
}

const getLocation = (id) => {

  const location = Locations.rooms.find(location => location.id === id)

  locationItemIds = location['itemIds']

  location.locationItems = (location['itemIds'] && Object.keys(locationItemIds).length > 0) ? getItems(location['itemIds']) : []

  return location
}

const getItem = id => Items.find(item => item.id === id)
const getItems = (ids) => ids.map(x => Items.find(item => item.id === x))
const drawMap  = (currentLocation, visited, mapIn) => {

  map = JSON.parse(JSON.stringify(mapIn));

  for (let x = 0; x < map.length; x++) {

    for (let y = 0; y < map[x].length; y++) {
      if (visited.includes(map[x][y])) {
          map[x][y] = (currentLocation === map[x][y]) ? 'x' : '-'
        } else {
          map[x][y] = '*'
        }
      }
    }

    return map
}

Game.prototype.setCurrentLocation = function(location) {
  this.location = location
};

Game.prototype.takeItem = function(itemId) {

  const locationItemIds = this.getState().location.itemIds

  if (locationItemIds.includes(itemId)) {

    const currentLocationItemIds = getLocation(this.location).itemIds

    const removableItemIndex = currentLocationItemIds.indexOf(itemId)

    if (removableItemIndex > -1 ) {
      //add to hand
      this.itemIds.push(itemId)
      //remove from ground
      currentLocationItemIds.splice(removableItemIndex, 1)

      const changedState = { ...this.getState(), message: 'You took ' + getItem(itemId).name }

      return changedState
    }
  } else {

      const changedState = { ...this.getState(), message: 'No such item' }

      return changedState

  }

  return this.getState()
}

Game.prototype.dropItem = function(itemId) {

  //todo messages
  let index = this.itemIds.indexOf(itemId);

  if (index > -1) {

    //add to ground
    this.getState().location.itemIds.push(itemId)

    //remove from hand
    this.itemIds.splice(index, 1);

    const changedState = { ...this.getState(), message: 'You dropped ' + getItem(itemId).name } //also remove item

    return changedState

  } else {
    const changedState = { ...this.getState(), message: 'No such item' }

    return changedState
  }
}

Game.prototype.moveTo = function(direction) {

  let location = Locations.rooms.find(location => location.id === this.location)

  if (location && location.exitIds[direction] !== null) {

    this.location = location.exitIds[direction]

    //mark to map as visited locati
    //! this.visited.includes(direction) &&
    this.visited.push(this.location)

  } else {
    const changedState = { ...this.getState(), message: 'You cannot go there' }
    return changedState
  }

  return this.getState()
}

module.exports = Game;
