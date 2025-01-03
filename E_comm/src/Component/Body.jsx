import React, { useState, useRef,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/product/productSlice';
import { data, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Body = () => {
  const dispatch = useDispatch()
  const btnRef = useRef()

  const [Product_cart, setProduct_cart] = useState(" ");
  const categories = [
    { name: 'Television', icon: '📺' },
    { name: 'Speakers', icon: '🔊' },
    { name: 'Headphones', icon: '🎧' },
    { name: 'Smartphone', icon: '📱' },
    { name: 'Laptops', icon: '💻' },
    { name: 'Games', icon: '🎮' },
  ];

  // State to hold the fetched products
  const [products, setProducts] = useState([]);

  // Fetch the product data from the backend when the component mounts
  useEffect(() => {
    // Replace with your actual API URL
    fetch('http://localhost:3000/product')
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Data fetched from backend:', data); // Log the fetched data
        setProducts(data); // Update state with fetched products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  
  const HandleClick = async (e, product) => {
    e.target.disabled = true;
    e.target.style.backgroundColor = "grey";
  
    try {
      // Send request to backend to add product to the cart
      const response = await fetch('http://localhost:3000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
        credentials:"include",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Show success toast
        toast(
          <>
            Added to cart.{' '}
            <Link to="cart" className="text-blue-500 underline">
              Check cart
            </Link>
          </>,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      } else {
        // Handle error response
        console.error('Error adding product:', result.message);
        toast.error(`Failed to add to cart: ${result.message}`, {
          position: 'top-right',
          autoClose: 5000,
        });
        e.target.disabled = false;
        e.target.style.backgroundColor = '';
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
      });
      e.target.disabled = false;
      e.target.style.backgroundColor = '';
    }
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

      <div className="bg-white py-4">
        <div className="container mx-auto flex justify-around items-center px-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 hover:text-blue-600 cursor-pointer"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* HeroSection */}

      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-4">
            <div className="bg-red-500 text-sm font-bold px-3 py-1 inline-block uppercase">
              Today Deal
            </div>
            <h1 className="text-4xl font-bold">Best iPad Deals At A Glance</h1>
            <p className="text-lg">FREE SHIPPING BY ECOMALL</p>
            <p className="text-2xl font-bold">From <span className="text-yellow-400">$499.99</span></p>
            <button className="bg-blue-600 px-6 py-3 text-lg font-medium rounded-lg shadow hover:bg-blue-700">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-iphone.png"
              alt="iPad Deal"
              className="rounded-lg h-96 w-1/2"
            />
          </div>
        </div>
      </div>

      {/* Sellers */}

      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
              >
              <div className="relative">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:3000/${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-md"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 min-h-10">{product.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-red-500 font-bold">{product.price}</p>
                  {product.oldPrice && (
                    <p className="text-gray-400 line-through">{product.oldPrice}</p>
                  )}
                </div>
                <p className="text-yellow-400 text-sm">{product.rating}</p>
                <div className='flex justify-center items-center'>
                <button className={`mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700`} onClick={(e) => { HandleClick(e,product) }}>
                  Add to cart
                </button>
                <button className="mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                 <Link to = {'/cart/payment'} state={product}> Buy Now </Link>
                </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center border rounded-lg shadow-sm p-4 bg-gray-100">
            <div className="text-center">
              <p className="text-lg font-semibold">UP TO 20% OFF</p>
              <p className="text-2xl font-bold my-2">Best Gifts</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
