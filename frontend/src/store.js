import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'; // Assuming these reducers exist


const reducer = combineReducers({
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware));

export default store;
