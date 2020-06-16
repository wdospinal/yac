import * as actions from '../constants/actions';

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
    userUid: '20',
    username: '',
    lastLogin: 1592006913231,
  },
  loading: true,
  created: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload, data }) => {
  switch (type) {
    case actions.ERASE_USER: {
      return INITIAL_STATE;
    }
    case actions.USER_FETCH_SUCCEEDED: {
      return {
        ...state,
        user: data,
      };
    }
    case actions.USER_UPDATE: {
      return {
        ...state,
        user: {
          ...state.user,
          [payload.type]: payload.value,
        },
      };
    }
    case actions.SET_LOADING: {
      return {
        ...state,
        loading: payload.loading,
      };
    }
    case actions.CREATE_USER_SUCCESS: {
      return {
        ...state,
        created: true,
      };
    }
    default: return state;
  }
};

export default userReducer;
