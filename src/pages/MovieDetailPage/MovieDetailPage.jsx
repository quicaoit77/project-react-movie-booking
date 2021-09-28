import React, { useEffect } from "react";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./MovieDetailStyle.scss";
import BannerComponent from "./banner/BannerComponent";
import Aos from "aos";
import ContentFilmComponent from "./contentFilm/ContentFilmComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  HIDE_LOADING,
  DISLAY_LOADING,
} from "../../redux/types/lazyLoadingType";

export default function MovieDetailPage(props) {
  const { id } = props.match.params;
  const { showTimesFilm } = useSelector((state) => state.cinemaReducer);
  console.log({ showTimesFilm });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: DISLAY_LOADING,
    });
    Aos.init({
      duration: 1000,
    });
    dispatch({
      type: "getShowTimeFilmApiAction",
      id,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADING,
      });
    }, 2000);
  }, []);
  return (
    <div>
      <BannerComponent movieDetail={showTimesFilm} />
      <ContentFilmComponent movieDetail={showTimesFilm} />
    </div>
  );
}
