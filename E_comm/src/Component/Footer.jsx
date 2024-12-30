import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t">
    {/* Info Section */}
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
      <div className="space-y-2">
        <div className="flex items-center justify-center md:justify-start">
          <svg className='size-12 m-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          <div className="ml-2">
            <h3 className="font-bold">FREE DELIVERY</h3>
            <p>Free shipping on all order</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-center md:justify-start">
        <svg className='size-12 m-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/></svg>
          <div className="ml-2">
            <h3 className="font-bold">RETURNS</h3>
            <p>Back guarantee under 7 days</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-4xl">🎧</span>
          <div className="ml-2">
            <h3 className="font-bold">SUPPORT 24/7</h3>
            <p>Support online 24 hours a day</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-center md:justify-star">
        <svg className='size-12 m-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/></svg>
          <div className="ml-2">
            <h3 className="font-bold">PAYMENTS</h3>
            <p>100% payment security</p>
          </div>
        </div>
      </div>
    </div>

    <hr className="my-8 mx-40 boder" />

    {/* Footer Links */}
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
      <div className="space-y-2">
        <h3 className="font-bold text-lg">Demo_Company</h3>
        <p>Find a location nearest you. <a href="#" className="text-blue-600">Our Stores</a></p>
        <p>Support1234@Ecomall.com</p>
        <p>+08 9229 8228</p>
        {/* <div className="flex space-x-4 mt-4">
          <a href="#" className="text-blue-600">🐦</a>
          <a href="#" className="text-blue-600">📸</a>
          <a href="#" className="text-blue-600">📘</a>
          <a href="#" className="text-blue-600">📍</a>
        </div> */}
      </div>
      <div>
        <h3 className="font-bold text-lg">About Us</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-600">About Us</a></li>
          <li><a href="#" className="hover:text-blue-600">News & Blog</a></li>
          <li><a href="#" className="hover:text-blue-600">Brands</a></li>
          <li><a href="#" className="hover:text-blue-600">Press Center</a></li>
          <li><a href="#" className="hover:text-blue-600">Advertising</a></li>
          <li><a href="#" className="hover:text-blue-600">Investors</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-lg">Support</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-600">Support Center</a></li>
          <li><a href="#" className="hover:text-blue-600">Manage</a></li>
          <li><a href="#" className="hover:text-blue-600">Service</a></li>
          <li><a href="#" className="hover:text-blue-600">Haul Away</a></li>
          <li><a href="#" className="hover:text-blue-600">Security Center</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-lg">Order</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-600">Check Order</a></li>
          <li><a href="#" className="hover:text-blue-600">Delivery & Pickup</a></li>
          <li><a href="#" className="hover:text-blue-600">Returns</a></li>
          <li><a href="#" className="hover:text-blue-600">Exchanges</a></li>
          <li><a href="#" className="hover:text-blue-600">Developers</a></li>
          <li><a href="#" className="hover:text-blue-600">Gift Cards</a></li>
        </ul>
      </div>
    </div>

    <hr className="my-8" />

    {/* Tags Section */}
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h3 className="font-bold text-lg">Trending Tags:</h3>
      <div className="flex flex-wrap justify-center space-x-2 mt-4">
        {["Accessories", "Apple iPhone", "Camera & Video", "Cellphone", "Desktop Computers", "Laptop"].map((tag, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <hr className="my-8" />

    {/* Footer Credits */}
    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
      <p>© Demo. All Rights Reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
