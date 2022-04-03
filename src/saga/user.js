import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../reducer/user";

function* login(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}
function* logout(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* register(action) {
  try {
    yield delay(1000);
    yield put({
      type: REGISTER_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REGISTER_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchRegister)]);
}
