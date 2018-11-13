const Items  = require('./items')
const Locations = require('./locations')

const init = (name) => {
  return {
    name: name ? name : 'Player 1',
    health: 50,
    stamina: 100,
    locationId: 1,
    visited: [1],
    inventoryItemIds: [3],
    message: null,
    locations: Locations,
    items: Items,
  }
}

module.exports = { init }
