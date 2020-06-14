import * as actions from '../constants/actions';

const INITIAL_STATE = {
  user: {
    userId: '01',
    username: 'wdospinal',
    lastLogin: 1592006913231,
  },
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
