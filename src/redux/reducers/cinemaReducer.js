import * as cinemaType from "../types/cinemaType";

const stateDefault = {
  cinemaList: [],
  showTimesFilm: {},
};

const cinemaReducer = (state = stateDefault, action) => {
  console.log(action.type);
  switch (action.type) {
    case cinemaType.GET_CINEMA_LIST: {
      return { ...state, cinemaList: action.data };
    }
    case cinemaType.GET_SHOWTIMES_FILM: {
      return { ...state, showTimesFilm: action.data };
    }
    default:
      return { ...state };
  }
};
export default cinemaReducer;
