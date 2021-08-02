const initialState = {
  items: []
}

export default function statusReducer(state=initialState, action) {
  switch (action.type) {
    case "status/load/fulfilled":
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}

export const loadStatus = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/status")
    const json = await response.json()
    dispatch({type:"status/load/fulfilled", payload:json})
  }
}