import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);  // State to store fetched orders
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/orders', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          setError(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg sm:w-auto">
      <h2 className="text-xl font-semibold mb-6">Admin Orders</h2>
      <table className="w-full border-t border-gray-200">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-3 px-4">Order</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t border-gray-200">
              <td className="py-3 px-4">{`#${order._id}`}</td>
              <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-yellow-600 font-medium">{order.status}</td>
              <td className="py-3 px-4 font-semibold">${order.totalAmount} for {order.products.length} items</td>
              <td className="py-3 px-4">
                <Link
                  to={`/admin/orders/view/${order._id}`}  // Link to view the specific order
                  className="font-medium bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
