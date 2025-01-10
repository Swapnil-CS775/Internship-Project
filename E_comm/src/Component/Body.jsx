import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/product/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Body = () => {
  const currentStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()
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

  const products = [
    {
      id: 1,
      name: "Laptop 14” 8-core CPU, M2 2022, 8GB | 256GB, New",
      image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
      price: "$1,359.00",
      oldPrice: "$1,584.00",
      discount: "-14%",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      id: 2,
      name: "MacBook Pro 13.3” 16GB/512GB Silver",
      image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
      price: "$1,527.00",
      oldPrice: "$1,795.00",
      discount: "-15%",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      id: 3,
      name: "Ultra Thin Laptop, Intel Celeron, 4GB RAM, 320GB HDD",
      image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
      price: "$707.00",
      oldPrice: "$875.00",
      discount: "-19%",
      rating: "⭐⭐⭐⭐",
    },
    {
      id: 4,
      name: "Laptop 2 in 1 9420 Core i7, Windows 11 Pro",
      image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
      price: "$2,851.00",
      oldPrice: null,
      discount: null,
      rating: "⭐⭐⭐",
    },
    {
      id: 5,
      name: "HP 14” Convertible 2-in-1 Chromebook Laptop",
      image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
      price: "$379.99",
      oldPrice: null,
      discount: "HOT",
      rating: "⭐⭐⭐⭐",
    },
  ];

  const HandleClick = (e, product) => {
    if (!currentStatus) {
      navigate('/login');
    }
    setProduct_cart(product);
    dispatch(addProduct(product))
    console.log("Prinitng and event");
    e.target.disabled = true;
    e.target.style.backgroundColor = "grey";

    toast(<>
      Added to cart  . <Link to="cart" className="text-blue-500 underline">Check cart</Link>
    </>, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  }
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
        theme="dark"
      />

      <div className="bg-white py-4">
        <div className="container mx-auto flex justify-around items-center px-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="md:hover:scale-110 flex flex-col items-center space-y-2 hover:text-blue-600 cursor-pointer"
            >
              <span className="text-xl sm:text-2xl">{category.icon}</span>
              <span className="text-gray-700 w-3/12 sm:w-auto overflow-hidden md:overflow-visible sm:font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* HeroSection */}

      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto flex md:flex-row items-center px-4">
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
          <div className="w-1/3 md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/slide1-iphone.png"
              alt="iPad Deal"
              className="rounded-lg h-96 md:w-1/2"
            />
          </div>
        </div>
      </div>

      {/* Sellers */}

      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition hover:cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full hover:scale-110 h-40 object-cover rounded-t-md"
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
                  <button className={`mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700`} onClick={(e) => { HandleClick(e, product) }}>
                    Add to cart
                  </button>
                  <button className="mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
                    <Link
                      to={currentStatus ? "/cart/payment" : "/login"}
                      state={currentStatus ? [product] : undefined}
                      className="text-center inline-block"
                    >
                      Buy Now
                    </Link>
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
