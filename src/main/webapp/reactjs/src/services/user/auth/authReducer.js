import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

const initialState = {
  id: 0,
  role: "",
  username: "",
  isLoggedIn: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case SUCCESS:
    case FAILURE:
      return {
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
        id: action.payload.id,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default reducer;
