//actino types
const SET_AUTHED_USER = "SET_AUTHED_USER";
const UNSET_AUTHED_USER = "UNSET_AUTHED_USER";

//actions
export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER,
  };
}

//reducers
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case UNSET_AUTHED_USER:
      return null;
    default:
      return state;
  }
}
