
const drinkItem = (state, item, protagonist) => {
  if (item.isEdible === false) {
    const changedState = { ...state, message: 'You might not want to drink that' }

    return changedState
  } else if (item.isActive === false) {
    return { ...state, message: 'You try to squeeze a drop, but nope'}
  } else {

  item.isActive = false
  item.text = 'It is empty'
  protagonist.health = 100

  const changedState = {
    ...state,
    health: protagonist.health,
    message: 'You consume ' + item.name,
  } //also remove item
    return changedState
  }
}

module.exports = {
  drinkItem,
}
