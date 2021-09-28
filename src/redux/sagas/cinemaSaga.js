import { notification } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { cinemaManagerService } from "../../services/CinemaManagerService";
import * as cinemaType from "../types/cinemaType";
// GET_LIST_CINEMA
function* getCinemaListApiAction(action) {
  try {
    const { data } = yield call(() => cinemaManagerService.getCinemaListApi());
    yield put({
      type: cinemaType.GET_CINEMA_LIST,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getCinemaListApiActionSaga() {
  yield takeLatest("getCinemaListApiAction", getCinemaListApiAction);
}

// GET_SHOWTIME_FILM
function* getShowTimeFilmApiAction(action) {
  try {
    const { data } = yield call(() =>
      cinemaManagerService.getShowTimesFilmApi(action.id)
    );
    yield put({
      type: cinemaType.GET_SHOWTIMES_FILM,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getShowTimesFilmActionSaga() {
  yield takeLatest("getShowTimeFilmApiAction", getShowTimeFilmApiAction);
}

// GET_SHOWTIME_FILM_CINEMA
function* getShowTimesFilmCinemaAction(action) {
  try {
    const res = yield call(() =>
      cinemaManagerService.getShowTimesFilmCinemaApi(action.idCinema)
    );
    console.log(res);
    yield put({
      type: cinemaType.GET_SHOWTIMES_FILM_CINEMA,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getShowTimesFilmCinemaActionSaga() {
  yield takeLatest(
    "getShowTimesFilmCinemaAction",
    getShowTimesFilmCinemaAction
  );
}

// POST_NEW_SHOWTIME
function* postNewShowTimesApiAction(action) {
  try {
    const res = yield call(() =>
      cinemaManagerService.postNewShowTimesApi(action.form)
    );
    notification.open({
      message: "Notification",
      description: "Thêm lịch chiếu thành công!",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
  } catch (error) {
    notification.open({
      message: "Notification",
      description: error.response?.data,
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 1.5,
    });
  }
}

export function* postNewShowTimesApiActionSaga() {
  yield takeLatest("postNewShowTimesApiAction", postNewShowTimesApiAction);
}
