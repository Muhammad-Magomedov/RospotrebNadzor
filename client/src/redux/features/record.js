const initialState = {
  items: [],
  loading: false,
  updating: false,
  posting: false,
};

export default function recordReducer(state = initialState, action) {
  switch (action.type) {
    case "records/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "records/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "record/post/pending":
      return {
        ...state,
        posting: true,
      };
    case "record/post/fulfilled":
      return {
        ...state,
        posting: false,
        items: [...state.items, action.payload.data],
      };
    case "record/patch/fulfilled":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.recordId) {
            return {
              ...item,
              ...action.payload.data,
            };
          }
          return item
        }),
      };
    default:
      return state;
  }
}

export const loadRecords = (companyId) => {
  return async (dispatch) => {
    dispatch({ type: "records/load/pending" });
    const response = await fetch(
      `http://localhost:5000/records/company/${companyId}`
    );
    const json = await response.json();
    dispatch({ type: "records/load/fulfilled", payload: json });
  };
};

export const postRecord = (companyId, data) => {
  return async (dispatch) => {
    dispatch({ type: "record/post/pending" });
    await fetch(`http://localhost:5000/record/company/${companyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch({
      type: "record/post/fulfilled",
      payload: {
        data,
        companyId,
      },
    });
  };
};

export const patchRecord = (recordId, data) => {
  return async (dispatch) => {
    await fetch(`http://localhost:5000/record/company/${recordId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch({
      type: "record/patch/fulfilled",
      payload: { data, recordId },
    });
  };
};
