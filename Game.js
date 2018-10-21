
const Locations = require('./locations')
const Items  = require('./items')
const Protagonist = require('./protagonist')
const tools = require('./ItemHandling/tools')

class Game {
  constructor() {
    this.location = 1
    this.itemIds = [3]
    this.visited = [1]
    this.protagonist = new Protagonist()
    this.locations = new Locations()
    this.items = Items.slice(0)
  }

  getState() {
    return {
      health : this.protagonist.getHealth(),
      location : this.getLocation(this.location),
      visited : this.visited,
      inventory : this.getItems(this.itemIds),
      map : tools.drawMap(this.location, this.visited, this.locations.map),
      message: null,
    }}

  takeItem(itemId) {

    const locationItemIds = this.getState().location.itemIds

    if (locationItemIds.includes(itemId)) {

      const currentLocationItemIds = this.getLocation(this.location).itemIds

      const removableItemIndex = currentLocationItemIds.indexOf(itemId)

      if (removableItemIndex > -1 ) {
        //add to hand
        this.itemIds.push(itemId)
        //remove from ground
        currentLocationItemIds.splice(removableItemIndex, 1)

        const changedState = { ...this.getState(), message: 'You took ' + this.getItem(itemId).name }

        return changedState
      }
    } else {

        const changedState = { ...this.getState(), message: 'No such item' }

        return changedState

    }

    return this.getState()
  }

  dropItem(itemId) {

    //todo messages
    let index = this.itemIds.indexOf(itemId);

    if (index > -1) {

      //add to ground
      this.getState().location.itemIds.push(itemId)

      //remove from hand
      this.itemIds.splice(index, 1);

      const changedState = { ...this.getState(), message: 'You dropped ' + this.getItem(itemId).name }

      return changedState

    } else {
      return { ...this.getState(), message: 'No such item' }
    }
  }

  drinkItem(itemId) {

    const index = this.itemIds.indexOf(itemId);

    if (index > -1) {

      const item = this.getItem(itemId)

      const changedState = tools.drinkItem(this.getState(), item, this.protagonist)

      return changedState

    } else {
      return { ...this.getState(), message: 'No such item' }
    }
  }

  getLocation(id) {

    const location = this.locations.rooms.find(location => location.id === id)

    let locationItemIds = location.itemIds

    location.locationItems = (location['itemIds'] && Object.keys(locationItemIds).length > 0) ? this.getItems(location['itemIds']) : []

    return location
  }

  moveTo(direction) {

    let location = this.locations.rooms.find(location => location.id === this.location)

    if (location && location.exitIds[direction] !== null) {

      this.location = location.exitIds[direction]

      //mark as visited for map
      ! this.visited.includes(this.location) && this.visited.push(this.location)

    } else {
      return { ...this.getState(), message: 'You cannot go there'}
    }

    return this.getState()
  }

  getItem(id) { return this.items.find(item => item.id === id)}
  getItems(ids) {return ids.map(x => this.items.find(item => item.id === x))}
}

module.exports = Game;
