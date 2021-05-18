import {
  REGISTER_CLIENT_SUCCESS,
  REGISTER_CLIENT_FAILURE,
} from '../constants/clientConstants';

const initialState = {};

const clientReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case REGISTER_CLIENT_SUCCESS:
    case REGISTER_CLIENT_FAILURE:
    default:
      return state;
  }
};

export default clientReducer;
