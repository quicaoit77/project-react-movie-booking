import * as movieType from "../types/movieType";
import { MovieDetail } from "../../core/models/MovieModel";

const stateDefault = {
  movieList: [],
  movieDetail: new MovieDetail(),
};

const movieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case movieType.GET_MOVIE_LIST: {
      return { ...state, movieList: action.data };
    }
    case movieType.GET_MOVIE_DETAIL: {
      return { ...state, movieDetail: action.data };
    }
    default:
      return { ...state };
  }
};
export default movieReducer;
