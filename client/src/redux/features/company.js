const initialState = {
  items: [],
  loading: false,
  deleting: false,
  updating: false,
  avatar: null
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case "companies/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "companies/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "company/delete/fulfilled":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case "company/post/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "image/create/pending": {
      return {
        ...state,
        loading: true
      }
    }
    case "image/create/fulfilled": {
      return {
        ...state,
        loading: false,
        avatar: action.payload
      }
    }
    default:
      return state;
  }
}

export const loadCompanies = () => {
  return async (dispatch) => {
    dispatch({ type: "companies/load/pending" });
    const response = await fetch("http://localhost:5000/companies");
    const json = await response.json();
    dispatch({ type: "companies/load/fulfilled", payload: json });
  };
};

export const deleteCompany = (companyId) => {
  return async (dispatch) => {
    await fetch(`http://localhost:5000/company/${companyId}`, {
      method: "DELETE",
    });
    dispatch({ type: "company/delete/fulfilled", payload: companyId });
  };
};

export const postCompany = (data) => {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch({type: "company/create/pending"})
    const response = await fetch("https://localhost:5000/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data,
        image: state.company.avatar
      })
    })
    const json = await response.json()
    dispatch({type: "company/create/fulfilled", payload: json})
  }
};


export const downloadImage = (file) => {
  return async (dispatch) => {
    dispatch({type: "image/create/pending"})
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    })
    const json = await response.json()
    dispatch({ type: "image/create/fulfilled", payload: json.image });
  }
}




