import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeProduct } from "../redux/product/productSlice";

const Payment = (e) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const productData = location.state || []; // Added fallback for undefined productData

  // State for user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [loading, setLoading] = useState(true);

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("user data=", data);
        setUserData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          address: data.user.address || {
            street: "",
            city: "",
            state: "",
            zipCode: "",
          },
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Total price calculation considering quantity
  const totalPrice = productData
    .filter((product) => product.price && product.id !== 404) // If 404 filtering is needed
    .reduce((sum, product) => {
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price.replace(/[$,]/g, ""))
          : product.price;
      return sum + price * product.quantity; // considering quantity
    }, 0);

  const shipping = 0; // Assuming free shipping, change if necessary
  const totalAmount = totalPrice + shipping; // Total including shipping (if applicable)

  // Razorpay setup
  const amount = (totalAmount * 100).toString(); // Converting to subunits (paise for INR)
  const currency = "INR";
  const receiptId = "qwsaq1";

  const checkStockBeforePayment = async () => {
    const response = await fetch("http://localhost:3000/order/check-stock", {
      method: "POST",
      body: JSON.stringify({ products: productData }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return true; // Stock is available
    } else {
      toast.error(
        `Stock unavailable for products: ${data.insufficientStock.join(", ")}`
      );
      return false;
    }
  };

  const HandlePayment = async () => {
    const stockAvailable = await checkStockBeforePayment();
    if (!stockAvailable) return; // Stop if stock is insufficient

    const response = await fetch("http://localhost:3000/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log("Printing an order", order);

    var options = {
      key: "rzp_test_0RN3OhUvJL0nLK", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "XYZ electronics", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:3000/payment/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        if (jsonRes.msg === "success") {
          // Order creation triggered after successful payment
          const orderData = {
            shippingAddress: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              address: userData.address,
            },
            products: productData,
            totalAmount,
            status: "Pending", // Default status for order
            paymentStatus: "Completed", // Payment status set to Completed after successful payment
          };

          console.log("data going to backend is : ", JSON.stringify(orderData));

          // Send the order data to the backend
          const orderResponse = await fetch(
            "http://localhost:3000/order/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
              credentials: "include",
            }
          );

          const orderDataResponse = await orderResponse.json();
          if (orderDataResponse.message === "Order created successfully!") {
            toast.success("Order placed successfully!");

            // Update stock quantities in the backend
            const stockUpdateResponse = await fetch(
              "http://localhost:3000/order/update-stock",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  products: productData.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                  })),
                }),
                credentials: "include",
              }
            );

            const stockUpdateResult = await stockUpdateResponse.json();
            if (stockUpdateResponse.ok) {
              console.log("Stock updated successfully:", stockUpdateResult);
            } else {
              console.error(
                "Failed to update stock:",
                stockUpdateResult.message
              );
            }

            dispatch(removeProduct(productData)); // Dispatch remove action
            console.log("Product to be removed : ", productData);
            setTimeout(() => {
              navigate("/orders-placed");
            }, 2000);
          } else {
            toast.error("Failed to place order.");
          }
        } else {
          toast.error("Payment failed. Order not placed.");
        }
      },
      prefill: {
        name: "Web Dev Matrix",
        email: "webdevmatrix@example.com",
        contact: "9900000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="bg-gray-100 p-6 hover:shadow-md">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Billing Details */}
          <div className="md:col-span-2 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">BILLING DETAILS</h2>
            <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    First name *
                  </label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Last name *
                  </label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    className=" border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium">
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Country/Region */}
              <div>
                <label className="block text-sm font-medium">
                  Country / Region *
                </label>
                <select className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>India</option>
                  <option>Vietnam</option>
                  <option>United States</option>
                </select>
              </div>

              {/* Address Fields */}
              <div>
                <label className="block text-sm font-medium">
                  Street address *
                </label>
                <input
                  type="text"
                  value={userData.address.street}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, street: e.target.value },
                    })
                  }
                  placeholder="House number and street name"
                  className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 mb-2"
                />
                <input
                  type="text"
                  value={userData.address.state}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, state: e.target.value },
                    })
                  }
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* City and Postcode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    value={userData.address.city}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: { ...userData.address, city: e.target.value },
                      })
                    }
                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Postcode / ZIP *
                  </label>
                  <input
                    type="text"
                    value={userData.address.zipCode}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          zipCode: e.target.value,
                        },
                      })
                    }
                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Phone *</label>
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded shadow h-fit hover:shadow-md">
            <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>
            {productData.map((product) => (
              <div key={product.id}>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span>
                      {product.name} × {product.quantity}
                    </span>
                    <span>{(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            ))}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="mt-4">
              <input type="checkbox" className="mr-2" /> I agree with the terms
              and conditions
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                onClick={(e) => {
                  HandlePayment(e);
                }}
                className="w-1/2 bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
