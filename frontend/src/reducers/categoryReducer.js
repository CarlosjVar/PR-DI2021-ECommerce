import { GET_CATEGORIES } from '../constants/categoryConstants';

const initialState = {
  categoryList: [],
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categoryList: payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
