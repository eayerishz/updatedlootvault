import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OrderDetails.css'; // Ensure this path is correct for your project

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order-details/', {
          withCredentials: true, // Include credentials for authentication
        });
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching order details. Please try again later.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any error occurs
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p> // Message if no orders exist
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Money Spent</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.user || 'Anonymous'}</td> {/* Show 'Anonymous' if no user */}
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>${order.money_spent.toFixed(2)}</td> {/* Format to 2 decimal places */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderDetails;
