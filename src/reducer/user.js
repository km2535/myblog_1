import produce from "immer";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "./post";

const initialState = {
  info: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  registerLoading: false,
  registerDone: false,
  registerError: null,
};

const dummUser = (data) => ({
  ...data,
  nickname: "강민님",
  id: 1,
  Posts: [{ id: 1 }],
});

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const REGISTER_DONE_REQUEST = "REGISTER_DONE_REQUEST";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.info = dummUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.info = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
        break;

      case REGISTER_REQUEST:
        draft.registerLoading = true;
        draft.registerDone = false;
        draft.registerError = null;
        break;

      case REGISTER_SUCCESS:
        draft.registerLoading = false;
        draft.registerDone = true;
        break;

      case REGISTER_FAILURE:
        draft.registerLoading = false;
        draft.registerError = action.error;
        break;
      case REGISTER_DONE_REQUEST:
        draft.registerDone = false;
        break;

      case ADD_POST_TO_ME:
        draft.info.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.info.Posts = draft.info.Posts.filter((v) => v.id !== action.data);
        break;

      default:
        break;
    }
  });

export default reducer;
