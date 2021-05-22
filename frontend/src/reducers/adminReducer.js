import {
  GET_ADMINS,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
} from '../constants/adminConstants';

const initialState = {
  adminList: [],
  loading: true,
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADMINS:
      return {
        ...state,
        loading: false,
        adminList: payload,
      };
    case REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
        adminList: [payload, ...state.adminList],
      };
    case REGISTER_ADMIN_FAILURE:
    default:
      return state;
  }
};

export default adminReducer;
