import { GET_SPECIFICATIONS } from '../constants/specificationConstants';

const initialState = {
  specificationList: [],
};

const specificationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SPECIFICATIONS:
      return {
        ...state,
        specificationList: payload,
      };
    default:
      return state;
  }
};

export default specificationReducer;
