const initialState = {
  items: [],
  loading: false,
  deleting: false,
  updating: false,
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
    case "avatar/create/pending": {
      return {
        ...state,
        loading: true
      }
    }
    case "avatar/create/fulfilled": {
      return {
        ...state,
        loading: false,
        items: {
          ...state.items,
          avatar: action.payload
        }
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
  return async (dispatch) => {
    await fetch("http://localhost:5000/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    dispatch({ type: "company/post/fulfilled", payload: data });
  };
};


