export const click = (e) => {
  const code = e.charCode || e.keyCode
  if (code === 32 || code === 13) {
    return true
  }
}

// The single source of truth for "was this keydown the Escape key" —
// escape() uses it to decide whether to reset the menus, and Menu.jsx's
// window keydown handler uses it too, to decide whether the just-closed
// menu's focus should be returned to its trigger. Keeping one predicate
// means the two call sites can never drift out of sync on what counts as
// "Escape."
export const isEscape = (e) => e.keyCode === 27

export const escape = (e, resetMenus) => {
  if (isEscape(e)) {
    resetMenus()
  }
}
