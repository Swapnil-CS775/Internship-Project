import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminOrderView = () => {
  const { id } = useParams(); // Get order ID from URL params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/getOneOrder/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          setOrder(data); // Set the order data
        } else {
          setError(data.message || 'Failed to fetch order details');
        }
      } catch (err) {
        setError('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const formatPrice = (value) => (value ? value.toFixed(2) : '0.00');

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded shadow-lg m-7">
      <h2 className="text-xl font-semibold mb-4">
        Order #{order._id} was placed on{" "}
        <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span> and is currently{" "}
        <span className="text-yellow-600">{order.status}</span>.
      </h2>
      <h3 className="text-lg font-bold mb-4">Order details</h3>
      <table className="w-full border-t border-gray-200">
        <thead>
          <tr>
            <th className="text-left py-2">Product</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products && order.products.length > 0 ? (
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
  );
};

export default AdminOrderView;
