const getItem = (id, state) => { return state.items.find(item => item.id === id)}
const getItems = (ids, state) => {return ids.map(id => getItem(id, state))}
const getInventoryItems = (ids, items) => {return ids.map(id => items.find(item => item.id === id))}
const getRoomItems = (itemIds, state) => {return itemIds && Object.keys(itemIds).length > 0 ? getItems(itemIds, state) : []}
const getLocation = (state) => {

      return {
        room : state.locations.rooms.find(location => location.id === state.locationId),
        roomItems: getRoomItems(state.locations.rooms.find(location => location.id === state.locationId).itemIds, state),
      }
}

const drawMap = (currentLocation, visited, mapIn) => {

    let map = JSON.parse(JSON.stringify(mapIn));

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

const getView = (state) => {
  return {
    name: state.name,
    health: state.health,
    stamina: state.stamina,
    location: getLocation(state),
    inventory: getInventoryItems(state.inventoryItemIds, state.items),
    map : drawMap(state.locationId, state.visited, state.locations.map),
    message : 'You are still.'
  }
}

module.exports = {getItem, getItems, getInventoryItems, getRoomItems, getLocation, getView }
