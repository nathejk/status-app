const cacheBreakerVersion = process.env.VERSION || 2

export const loadState = () => {
  try {
    const jsonState = localStorage.getItem('state')
    if (jsonState) {
      const state = JSON.parse(jsonState)
      if (state.version !== cacheBreakerVersion) {
        return undefined
      }
      return state
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
    state.version = cacheBreakerVersion
    localStorage.setItem('state', JSON.stringify(state))
  } catch (error) {
  }
}
