import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/OrderDetails.css'; // Adjust the path to point to the styles directory

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch order details from the backend
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order-details/', {
          withCredentials: true, // Include credentials for authentication
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <h1>Order Details</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p> // Message if no orders exist
      ) : (
        <table>
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