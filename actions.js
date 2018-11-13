const { move, take, drop, drink } = require('./actionsManager')
const { getView } = require('./utils')

const view = (state) => ({
    getSituation: () => {
        return getView(state)
      }
})

const actions = (state) => ({

  moveTo: (direction) => move(direction, state),
  takeItem: (itemId) => take(itemId, state),
  dropItem: (itemId) => drop(itemId, state),
  drinkItem: (itemId) => drink(itemId, state),
  resetState: () => {
    //todo
    state = initialState.init()

    return { ...getView(state), message: 'Reset.' }
  },
})

module.exports = { actions, view }
