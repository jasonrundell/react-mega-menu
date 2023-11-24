export const click = (e) => {
  const code = e.charCode || e.keyCode
  if (code === 32 || code === 13) {
    return true
  }
}

export const escape = (e, resetMenus) => {
  if (e.keyCode === 27) {
    resetMenus()
  }
}
