import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>
        <div className="bg-white shadow-md py-4 mb-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600"> <Link to={"/"}>Demo_Logo</Link> </span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-1/2">
          <select className="border border-gray-300 p-2 rounded-l-lg">
            <option>All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphones">Headphones</option>
          </select>
          <input
            type="text"
            placeholder="Search for products"
            className="border-t border-b border-gray-300 p-2 w-full"
          />
          <button className="bg-blue-600 text-white p-2 rounded-r-lg border-2">SEARCH</button>
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-6">
          <div className="text-gray-600"><Link to={"/"}> Need Help? </Link></div>
          <div className="text-gray-600 w-9 h-7"> 
            <Link to={"/login"}>
            <svg className='size-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
            </Link> 
            
            </div>
          <div className="flex items-center space-x-2 w-9 h-7">
          <Link to={"/cart"}><svg className='size-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></Link>
          
          </div>
        </div>
      </div>
    </div>
    </>
    )
}

export default Navbar
