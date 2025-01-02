import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/product/productSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const products1 = useSelector((state) => state.products);

  // Remove duplicates using Map
  const products = Array.from(new Map(products1.map((item) => [item.id, item])).values());

  // State to track quantity for each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Default quantity is 1 for each product
      return acc;
    }, {})
  );

  // Function to handle quantity change
  const handleQtyChange = (productId, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] + delta), // Ensure quantity is at least 1
    }));
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="border-b border-gray-300 pb-2">
          <div className="grid grid-cols-4 text-gray-600 font-semibold text-sm">
            <span>Product</span>
            <span className="text-right">Price</span>
            <span className="text-right mr-5">Quantity</span>
            <span className="text-right mr-20">Subtotal</span>
          </div>
        </div>
        <div className="border-b border-gray-300 py-4">
          {products.length === 1 || products.length === 0 && (
            <span className="text-center font-bold block text-xl">Cart is Empty</span>
          )}
          {products.map((product) => (
            <div key={product.id}>
              {product.id !== 404 && (
                <div className="grid grid-cols-4 items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image} // Replace with the actual product image URL
                      alt="Product"
                      className="w-20"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="text-right">{product.price}</span>
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      onClick={() => handleQtyChange(product.id, -1)}
                      className="px-3 py-1 border border-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{quantities[product.id]}</span>
                    <button
                      onClick={() => handleQtyChange(product.id, 1)}
                      className="px-3 py-1 border border-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="mr-4">
                      $
                      {(
                        parseFloat(product.price.replace(/[^0-9.-]+/g, "")) *
                        quantities[product.id]
                      ).toFixed(2)}
                    </span>
                    <button className="bg-blue-600 px-4 py-2 m-2 rounded-lg shadow hover:bg-blue-700 text-white">
                      <Link to = {'/cart/payment'} state={product}> Buy</Link>
                     
                    </button>
                    <button
                      onClick={() => {
                        dispatch(removeProduct(product));
                        // Remove quantity when product is removed
                        setQuantities((prev) => {
                          const newQuantities = { ...prev };
                          delete newQuantities[product.id];
                          return newQuantities;
                        });
                      }}
                      className="text-red-500 font-semibold text-lg"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-6 space-x-4">
          <input
            type="text"
            placeholder="Coupon code"
            className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
          />
          <button className="px-6 py-2 bg-black text-white rounded">Apply Coupon</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
