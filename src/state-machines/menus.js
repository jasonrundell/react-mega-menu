const MenuStateMachine = (state) => {
  const validStates = ['closed', 'open']
  const defaultState = 'open'
  let stateChangedTo = defaultState

  if (validStates.includes(state)) {
    switch (state) {
      case validStates[0]:
        stateChangedTo = validStates[1]
        break
      case validStates[1]:
        stateChangedTo = validStates[0]
        break
      default:
        stateChangedTo = validStates[0]
    }
  }
  return stateChangedTo
}

export { MenuStateMachine }
