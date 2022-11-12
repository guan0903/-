import {
    legacy_createStore,
    applyMiddleware
} from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducer from "./modules/reducer"
export default legacy_createStore(reducer,applyMiddleware(thunk,logger))