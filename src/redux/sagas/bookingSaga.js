import * as bookingType from "../types/bookingType";
import * as lazyLoadingType from "../types/lazyLoadingType";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { bookingService } from "../../services/BookingService";
import { notification } from "antd";
// GET_LIST_CHAIR
function* getListChairApiAction(action) {
  yield put({
    type: lazyLoadingType.DISLAY_LOADING,
  });
  try {
    const { data } = yield call(() =>
      bookingService.getListChairCinemaApi(action.idShowtimes)
    );
    yield put({
      type: bookingType.GET_LIST_CHAIR_CINEMA,
      data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
  yield delay(2000);
  yield put({
    type: lazyLoadingType.HIDE_LOADING,
  });
}
export function* getListChairApiActionSaga() {
  yield takeLatest("getListChairApiAction", getListChairApiAction);
}

// BOOKING_CHAIR
function* bookingTicketApiAction(action) {
  yield put({
    type: lazyLoadingType.DISLAY_LOADING,
  });
  try {
    const { data } = yield call(() =>
      bookingService.bookingTicketApi(action.infoBooking)
    );
    yield put({
      type: bookingType.BOOKING_TICKET,
      history: action.history,
    });
    notification.open({
      message: "Notification",
      description: data,
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
  yield delay(2000);
  yield put({
    type: lazyLoadingType.HIDE_LOADING,
  });
}
export function* bookingTicketApiActionSaga() {
  yield takeLatest("bookingTicketApiAction", bookingTicketApiAction);
}
