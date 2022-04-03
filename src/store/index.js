import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducer";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootSaga from "../saga";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
);

export const sagaRun = () => {
  sagaMiddleware.run(rootSaga);
};

export default store;
