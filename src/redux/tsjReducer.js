let initialState = {
  authLogin: "",
  base: [],
};

const AUTH_LOGIN = "AUTH_LOGIN";
const LOG_OUT = 'LOG_OUT'

const tsjReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return (state = {
        ...state,
        authLogin: action.authLogin,
      });
      case LOG_OUT:
        return (state = {
          ...state,
          authLogin: '',
        })
    default:
      return state;
  }
};

export const authLogin = (authLogin) => {
  return { type: AUTH_LOGIN, authLogin };
};

export const logOut = () => {
  return {type: LOG_OUT}
}

export default tsjReducer;
