import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import PayPalComponent from '../components/PayPalComponent';
import { createOrderAndPay } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    const handlePayment = (orderData) => {
        dispatch(createOrderAndPay(orderData));
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h1>Order {order._id}</h1>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Details</h2>
                            <p>Total Amount: ${order.totalPrice}</p>
                        </ListGroup.Item>
                    </ListGroup>
                    <PayPalComponent amount={order.totalPrice} onPaymentSuccess={handlePayment} />
                </div>
            )}
        </div>
    );
};

export default OrderScreen;
