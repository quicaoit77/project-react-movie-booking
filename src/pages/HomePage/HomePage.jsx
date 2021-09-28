import React, { useEffect } from "react";
import CarouselComponent from "./carousel/CarouselComponent";
import ComingSoonComponent from "./comingSoon/ComingSoonComponent";
import ShowFilmComponent from "./showFilm/ShowFilmComponent";
import ShowTime2Component from "./showTime/ShowTime2Component";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import {
  DISLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/types/lazyLoadingType";
import FindShowTimeComponent from "./findShowTime/FindShowTimeComponent";

export default function HomePage() {
  const { movieList } = useSelector((state) => state.movieReducer);
  const { cinemaList } = useSelector((state) => state.cinemaReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: DISLAY_LOADING,
    });
    Aos.init({
      duration: 1000,
    });
    dispatch({
      type: "getMovieListApiAction",
    });
    dispatch({
      type: "getCinemaListApiAction",
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADING,
      });
    }, 2000);
  }, []);
  return (
    <div>
      <CarouselComponent />
      <FindShowTimeComponent movieList={movieList} />
      <ShowFilmComponent movieList={movieList} />
      <ShowTime2Component cinemaList={cinemaList} />
      <ComingSoonComponent movieList={movieList} />
    </div>
  );
}
