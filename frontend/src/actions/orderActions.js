import axios from 'axios';
import { 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_PAY_RESET 
} from '../constants/orderConstants';

// Action to create an order and handle payment
export const createOrderAndPay = (orderData) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/orders/', orderData, config);
        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        // Additional logic for payment confirmation can be added here

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Action to get order details by ID
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/orders/${id}`);
        dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'ORDER_DETAILS_FAIL', payload: error.message });
    }
};

// Action to handle order payment
export const payOrder = (orderId) => async (dispatch) => {
    // Placeholder for processing payment
    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: orderId });
    dispatch({ type: ORDER_PAY_RESET });
};
