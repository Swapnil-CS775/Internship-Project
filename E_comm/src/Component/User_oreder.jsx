import React from 'react'

const User_oreder = () => {
    const order = {
        orderId: "#7990",
        orderDate: "Jan 3, 2025",
        status: "On hold",
        products: [
          {
            name: "Samsung Galaxy S23 Ultra, Factory Unlocked, 512GB",
            quantity: 3,
            price: 2099.97,
          },
          {
            name: "MacBook Pro 13.3'' 16GB/512GB Silver",
            quantity: 1,
            price: 1527.0,
          },
        ],
        subtotal: 3626.97,
        shipping: "Free shipping",
        paymentMethod: "Check payments",
        total: 3626.97,
        billingAddress: {
          name: "Omkar Kadam",
          address: "Vpkbiet college MIDC road Baramati",
          city: "Pune",
          state: "Maharashtra",
          zip: "413133",
          country: "India",
          phone: "+919322300141",
          email: "omkarkadam0141@gmail.com",
        },
        shippingAddress: {
          name: "Omkar Kadam",
          address: "Vpkbiet college MIDC road Baramati",
          city: "Pune",
          state: "Maharashtra",
          zip: "413133",
          country: "India",
        },
      };
    
      return (
        <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded shadow-lg m-7">
          <h2 className="text-xl font-semibold mb-4">
            Order {order.orderId} was placed on{" "}
            <span className="font-medium">{order.orderDate}</span> and is currently{" "}
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
              {order.products.map((product, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2">
                    {product.name} × {product.quantity}
                  </td>
                  <td className="text-right py-2">${product.price.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Subtotal:</td>
                <td className="text-right py-2">${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Shipping:</td>
                <td className="text-right py-2">{order.shipping}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-semibold">Payment method:</td>
                <td className="text-right py-2">{order.paymentMethod}</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 font-bold">Total:</td>
                <td className="text-right py-2 font-bold">${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Billing Address */}
            <div>
              <h4 className="text-lg font-bold">BILLING ADDRESS</h4>
              <p>{order.billingAddress.name}</p>
              <p>{order.billingAddress.address}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.state}{" "}
                {order.billingAddress.zip}
              </p>
              <p>{order.billingAddress.country}</p>
              <p>📞 {order.billingAddress.phone}</p>
              <p>✉️ {order.billingAddress.email}</p>
            </div>
            {/* Shipping Address */}
            <div>
              <h4 className="text-lg font-bold">SHIPPING ADDRESS</h4>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      );
    };

export default User_oreder
