import React from 'react'

const Payment = () => {
    const amount = "78000"
    const currency = "INR";
    const receiptId = "qwsaq1";
    const HandlePayment = async () => {
        console.log("Click Ho gaya bhai!!");
        const response = await fetch("http://localhost:5000/order", {
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
        console.log(order);

        var options = {
            key: "rzp_test_0RN3OhUvJL0nLK", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "Acme Corp", //your business name
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    "http://localhost:5000/order/validate",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                console.log(jsonRes);
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "Web Dev Matrix", //your customer's name
                email: "webdevmatrix@example.com",
                contact: "9000000000", //Provide the customer's phone number for better conversion rates
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
    }
    return (
        <div>
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
                                    <label className="block text-sm font-medium">First name *</label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Last name *</label>
                                    <input
                                        type="text"
                                        className=" border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium">Company name (optional)</label>
                                <input
                                    type="text"
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Country/Region */}
                            <div>
                                <label className="block text-sm font-medium">Country / Region *</label>
                                <select
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>Vietnam</option>
                                    <option>India</option>
                                    <option>United States</option>
                                </select>
                            </div>

                            {/* Address Fields */}
                            <div>
                                <label className="block text-sm font-medium">Street address *</label>
                                <input
                                    type="text"
                                    placeholder="House number and street name"
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* City and Postcode */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Town / City *</label>
                                    <input
                                        type="text"
                                        className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Postcode / ZIP *</label>
                                    <input
                                        type="text"
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
                                        className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email address *</label>
                                    <input
                                        type="email"
                                        className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Account Information */}
                            <div>
                                <label className="block text-sm font-medium">Account username *</label>
                                <input
                                    type="text"
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Create account password *</label>
                                <input
                                    type="password"
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Order Notes */}
                            <div>
                                <label className="block text-sm font-medium">Order notes (optional)</label>
                                <textarea
                                    rows="3"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    className="border-2 w-full border-gray-300 rounded p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded shadow h-fit hover:shadow-md">
                        <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span>Samsung Galaxy S23 Ultra</span>
                                <span>$699.99</span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$699.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between font-bold mt-4">
                            <span>Total</span>
                            <span>$699.99</span>
                        </div>
                        <hr className="my-4" />
                        <div className="mt-4">
                            <input type="checkbox" className="mr-2" /> I agree with the terms and conditions
                        </div>
                        <div className='w-full flex justify-center items-center'><button onClick={() => { HandlePayment() }} className="w-1/2 bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600">PLACE ORDER</button></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
