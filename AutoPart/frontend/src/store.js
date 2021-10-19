import {applyMiddleware, combineReducers, createStore, compose} from "redux";
//import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history';
import authReducer from "./reducers/authReducer";

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });

const middleware = [
    thunk,
    routerMiddleware(history)
];



const rootReducer = combineReducers({
    auth: authReducer,
    router: connectRouter(history)
});

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    enhancers.push(window.devToolsExtension());
  }

const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware), ...enhancers)
);
export default store;