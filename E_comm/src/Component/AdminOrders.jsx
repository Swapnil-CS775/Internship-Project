import React from 'react'
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const orders = [
      {
        orderId: "#7990",
        orderDate: "Jan 3, 2025",
        status: "On hold",
        total: "$3,626.97",
        items: 4
      },
      {
        orderId: "#7990",
        orderDate: "Jan 3, 2025",
        status: "On hold",
        total: "$3,626.97",
        items: 4
      },
    ];
  
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
            {orders.map((order, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-3 px-4">{order.orderId}</td>
                <td className="py-3 px-4">{order.orderDate}</td>
                <td className="py-3 px-4 text-yellow-600 font-medium">{order.status}</td>
                <td className="py-3 px-4 font-semibold">
                  {order.total} for {order.items} items
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={'view'}
                    className= " font-medium bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
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
}

export default AdminOrders;
