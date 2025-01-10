import React, { useState, useEffect } from 'react';

const User_oreder = () => {
  const [orders, setOrders] = useState([]); // Now an array to hold multiple orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the order data when the component mounts
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('http://localhost:3000/order/view', {
          method: 'GET',
          credentials: 'include', // Include credentials for authentication
        });

        const data = await response.json();
        console.log("data is :", JSON.stringify(data));

        if (response.ok && Array.isArray(data) && data.length > 0) {
          setOrders(data); // Set multiple orders if available
        } else {
          setError(data.message || 'Failed to fetch order data');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []); // No dependency, so it runs once when the component mounts

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // If no order data is returned
  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }

  // Function to safely format numbers
  const formatPrice = (value) => {
    return value ? value.toFixed(2) : '0.00'; // Return '0.00' if the value is undefined or null
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded shadow-lg m-7">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.map((order, index) => (
        <div
          key={order._id}
          className="border-t-2 border-gray-300 pt-8 pb-8 mb-6" // Adds separation between orders
        >
          <h3 className="text-lg font-bold mb-4">
            Order was placed on{" "}
            <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span> and is currently{" "}
            <span className="text-yellow-600">{order.status}</span>.
          </h3>
          <h4 className="text-lg font-bold mb-4">Order details</h4>
          <table className="w-full border-t border-gray-200">
            <thead>
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products && Array.isArray(order.products) && order.products.length > 0 ? (
                order.products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-2">
                      {product.name} × {product.quantity}
                    </td>
                    <td className="text-right py-2">${formatPrice(product.price * product.quantity)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-2">No products available</td>
                </tr>
              )}
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Subtotal:</td>
                <td className="text-right py-2">${formatPrice(order.totalAmount)}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Shipping:</td>
                <td className="text-right py-2">{order.shipping || 'N/A'}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Payment method:</td>
                <td className="text-right py-2">{order.paymentStatus}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-bold">Total:</td>
                <td className="text-right py-2 font-bold">${formatPrice(order.totalAmount)}</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Billing Address */}
            <div>
              <h4 className="text-lg font-bold">SHIPPING ADDRESS</h4>
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.address.street}</p>
              <p>
                {order.shippingAddress.address.city}, {order.shippingAddress.address.state}{" "}
                {order.shippingAddress.address.zipCode}
              </p>
              <p>{order.shippingAddress.address.country}</p>
              <p>📞 {order.shippingAddress.phone}</p>
              <p>✉️ {order.shippingAddress.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User_oreder;
