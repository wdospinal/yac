import * as actions from '../constants/actions';

const INITIAL_STATE = {
  user: {},
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.USER_FETCH_SUCCEEDED: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: return state;
  }
}

export default userReducer;
