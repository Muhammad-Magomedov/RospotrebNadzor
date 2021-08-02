// const initialState = {
//   items: []
// }
//
// export default function imageReducer(state = initialState, action) {
//   switch (action.type) {
//     case "image/create/pending": {
//       return {
//         ...state,
//         loading: true
//       }
//     }
//     case "image/create/fulfilled": {
//       return {
//         ...state,
//         loading: false,
//         items: {
//           ...state.items,
//           image: action.payload
//         }
//       }
//     }
//     default: {
//     return state
//     }
//   }
// }
//
// export const addImage = (file) => {
//   return async (dispatch) => {
//     dispatch({type: "image/create/pending"})
//     const formData = new FormData()
//     formData.append('file', file)
//     const response = await fetch("http://localhost:5000/company", {
//       method: "POST",
//       body: formData
//     })
//     const json = await response.json()
//     dispatch({ type: "image/create/fulfilled", payload: json.image });
//   }
// }
