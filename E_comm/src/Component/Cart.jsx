import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/product/productSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const productsFromRedux = useSelector((state) => state.products);

  

  // Local state for products
  const [products, setProducts] = useState([]);

  // State to track quantity for each product
  const [quantities, setQuantities] = useState({});

  // Fetch cart data from the server
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Cart Data:", data);

        // Transform fetched cart items into the format expected by products
        const fetchedProducts = data.cart.items.map((item) => ({
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: `http://localhost:3000/${item.productId.image}`,
          quantity: item.quantity,
        }));

        // Combine fetched products with Redux products
        const updatedProducts = Array.from(
          new Map(
            [...productsFromRedux, ...fetchedProducts].map((item) => [item.id, item]) // Deduplicate by `id`
          ).values()
        );

        setProducts(updatedProducts); // Update local state

        setQuantities(
          updatedProducts.reduce((acc, product) => {
            acc[product.id] = product.quantity || 1; // Use the quantity from fetched data or default to 1
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchCartData();
  }, [productsFromRedux]);

  // Function to handle quantity change
  const handleQtyChange = async (productId, delta) => {
    // Calculate the new quantity
    const newQuantity = (quantities[productId] || 1) + delta;

    if (newQuantity < 1) return; // Prevent negative quantities

    // Update backend (assuming there's an endpoint to handle this)
    try {
      const response = await fetch("http://localhost:3000/user/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action: delta === 1 ? "increase" : "decrease" }),
        credentials: "include", // Include cookies for authentication
      });

      const data = await response.json();

      if (response.ok) {
        // If the backend update is successful, update the UI (local state)
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: newQuantity, // Update the quantity in local state
        }));

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
          )
        );
      } else {
        console.error("Error updating quantity:", data.message);
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove product");
      }

      const data = await response.json();
      console.log("Product removed successfully:", data);

      // Remove the product from the `products` state after it's removed from the backend
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

      // Remove the product from the `quantities` state as well
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        delete newQuantities[productId];
        return newQuantities;
      });
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
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
          {products.length === 0 && (
            <span className="text-center font-bold block text-xl">Cart is Empty</span>
          )}
          {products.map((product) => (
            <div key={product.id}>
              {product.id !== 404 ? (
                <div className="grid grid-cols-4 items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
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
                      ${(
                        product.price * quantities[product.id]
                      ).toFixed(2)}
                    </span>
                    <button className="bg-blue-600 px-4 py-2 m-2 rounded-lg shadow hover:bg-blue-700 text-white">
                      <Link to = {'/cart/payment'} state={[product]}> Buy</Link>
                     
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500 font-semibold text-lg"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ) : null}
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

          { products.length > 1 &&
            <button className="bg-blue-600 px-4 py-2 m-2 rounded-lg shadow hover:bg-blue-700 text-white">
            <Link to="/cart/payment" state={products}> Buy All </Link>
          </button>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
