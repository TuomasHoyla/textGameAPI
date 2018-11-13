const { getView, getLocation, getItem } = require('./utils')

const move = (direction, state) => {

    const location = getLocation(state).room

    if (location && location.exitIds[direction] !== null) {

      state.locationId = location.exitIds[direction]

      //mark as visited for map
      ! state.visited.includes(location) && state.visited.push(state.locationId)

      return {...getView(state), message : ('You enter to ' + getLocation(state).room.name)}

    }
    return { ...getView(state), message: 'You cannot go there'}
}

const drink = (itemId, state) => {

  const index = state.inventoryItemIds.indexOf(itemId)

  if (index > -1) {

    const item = state.items.find(item => item.id === itemId)

    if (! item.isEdible) {
      return { ...getView(state), message: 'You might not want to drink that' }
    } else if (! item.isActive) {
      return { ...getView(state), message: 'You try to squeeze a drop, but nope'}
    }

    item.isActive = false
    item.text = 'It is empty'
    state.health = 100

    return { ...getView(state), message: 'You consume ' + item.name}
  }
  return { ...getView(state), message: 'No such item' }
}

const drop = (itemId, state) => {

  const index = state.inventoryItemIds.indexOf(itemId);

  if (index > -1) {

    //add to ground
    getLocation(state).room.itemIds.push(itemId)

    //remove from hand
    state.inventoryItemIds.splice(index, 1)

    return { ...getView(state), message: 'You dropped ' + getItem(itemId, state).name }
  }
  return { ...getView(state), message: 'No such item' }
}

const take = (itemId, state) => {

  if (getLocation(state).roomItems.includes(getItem(itemId, state)) && getItem(itemId, state).isTakeable) {

      //pick up
      state.inventoryItemIds.push(itemId)

      const index = getLocation(state).room.itemIds.indexOf(itemId)

      if (index > -1) {
        //remove from ground
        getLocation(state).room.itemIds.splice(index, 1)
      }

      return { ...getView(state), message: 'You took ' + getItem(itemId, state).name }
  }
  return {...getView(state), message: 'no such item' }
}

module.exports = { drink, take, drop, move }
