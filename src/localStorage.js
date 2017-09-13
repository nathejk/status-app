export const loadState = () => {
  try {
    const state = localStorage.getItem('state')
    if (state) {
      return JSON.parse(state)
    }

    return undefined
  } catch (error) {
    return undefined
  }
}

export const saveState = (state) => {
  if (!state) {
    localStorage.setItem('state', undefined)
  }

  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (error) {
  }
}
