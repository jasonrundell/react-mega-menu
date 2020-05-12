const MenuStateMachine = (state) => {
  const validStates = ["hidden", "opening", "open", "closing", "closed"];
  const defaultState = "hidden";
  let stateChangedTo = defaultState;

  if (validStates.includes(state)) {
    switch (state) {
      case validStates[0]:
        stateChangedTo = validStates[1];
        break;
      case validStates[1]:
        stateChangedTo = validStates[2];
        break;
      case validStates[2]:
        stateChangedTo = validStates[3];
        break;
      case validStates[3]:
        stateChangedTo = validStates[4];
        break;
      case validStates[4]:
        stateChangedTo = validStates[0];
        break;
      default:
        stateChangedTo = validStates[0];
    }
  }

  return stateChangedTo;
};

export { MenuStateMachine };
