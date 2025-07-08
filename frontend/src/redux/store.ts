import { applyMiddleware, legacy_createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./AppReducer/reducer";

// Add this line to let TypeScript know about the property:
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


export { store }