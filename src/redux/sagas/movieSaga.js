import { call, takeLatest, put } from "redux-saga/effects";
import * as movieType from "../types/movieType";
import { movieManagerService } from "../../services/MovieManagerService";
import { notification } from "antd";

/*
GET MOVIE LIST*/
function* getMovieListApiAction(action) {
  try {
    const { data } = yield call(() =>
      movieManagerService.getMovieListApi(action.film)
    );
    yield put({
      type: movieType.GET_MOVIE_LIST,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* getMovieListApiActionSaga() {
  yield takeLatest("getMovieListApiAction", getMovieListApiAction);
}

/*
GET MOVIE DETAIL*/
function* getMovieDetailAction(action) {
  try {
    const { data } = yield call(() =>
      movieManagerService.getMovieDetailApi(action.id)
    );
    yield put({
      type: movieType.GET_MOVIE_DETAIL,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
}
export function* getMovieDetailApiActionSaga() {
  yield takeLatest("getMovieDetailAction", getMovieDetailAction);
}

/*
POST NEW MOVIE*/
function* postNewMovieApiAction(action) {
  try {
    const res = yield call(() =>
      movieManagerService.postNewMovieApi(action.formData)
    );
    notification.open({
      message: "Notification",
      description: "Thêm film thành công",
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

export function* postNewMovieApiActionSaga() {
  yield takeLatest("postNewMovieApiAction", postNewMovieApiAction);
}

/*
POST UPDATE MOVIE*/
function* postUpdateMovieApiAction(action) {
  try {
    const res = yield call(() =>
      movieManagerService.postUpdateMovieApi(action.formData)
    );

    notification.open({
      message: "Notification",
      description: "Update Film thành công!",
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
export function* postUpdateMovieApiActionSaga() {
  yield takeLatest("postUpdateMovieApiAction", postUpdateMovieApiAction);
}
/*
DELETE MOVIE
*/
function* deleteMovieApiAction(action) {
  try {
    const res = yield call(() => movieManagerService.deleteMovieApi(action.id));
    notification.open({
      message: "Notification",
      description: "Delete Film thành công!",
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
export function* deleteMovieApiActionSaga() {
  yield takeLatest("deleteMovieApiAction", deleteMovieApiAction);
}
