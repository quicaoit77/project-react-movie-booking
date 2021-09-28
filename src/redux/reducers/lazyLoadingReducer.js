import * as lazyLoadingType from "../types/lazyLoadingType";
const stateDefault = {
  isLoading: false,
};

const lazyLoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case lazyLoadingType.DISLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case lazyLoadingType.HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};
export default lazyLoadingReducer;
