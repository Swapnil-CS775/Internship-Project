import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const inpRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [logInfo, setlogInfo] = useState(false);


  const handleSuggestionClick = (value) => {
    setSearchValue(value);
    setToggle(false);
  }
  const handleOpt = () => {
    setTimeout(() => { setToggle(!toggle); }, 300)

  }
  const handleLog = () => {
    setTimeout(() => { setlogInfo(!logInfo); }, 300)

  }
  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-white shadow-md py-4 mb-3 sticky top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="md:text-2xl font-bold text-blue-600"> <Link to={"/"}>Demo_Logo</Link> </span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-1/2">
            <select className="border w-3/12 md:w-auto border-gray-300 p-1 sm:p-2 rounded-l-lg">
              <option>All Categories</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphones">Headphones</option>
            </select>
            <div className="w-full relative">
              {toggle && <span className='absolute p-1 size-8 right-0 top-1'><svg className='size-full' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg></span>}
              {/* Input Field */}
              <input
                ref={inpRef}
                type="text"
                value={searchValue}
                onBlur={() => handleOpt()}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={() => setToggle(!toggle)} // Toggle suggestions when clicking on input
                placeholder="Search for products"
                className="border-t border-b border-gray-300 p-1 sm:p-2 w-full"
              />

              {/* Suggestions */}
              {toggle && (
                <div onBlur={() => handleOpt()} tabIndex={0} className="bg-white absolute z-10 rounded-lg border-t border-b border-gray-300 px-5 max-h-64 overflow-y-auto w-96">
                  <ul className="w-full">
                    <li
                      onClick={() => handleSuggestionClick('Option')}
                      className="p-1 hover:cursor-pointer hover:bg-gray-100"
                    >
                      Option 1
                    </li>
                    <li
                      onClick={() => handleSuggestionClick('Option 2')}
                      className="p-1 hover:cursor-pointer hover:bg-gray-100"
                    >
                      Option 2
                    </li>
                    <li
                      onClick={() => handleSuggestionClick('Option 3')}
                      className="p-1 hover:cursor-pointer hover:bg-gray-100"
                    >
                      Option 3
                    </li>
                    <li
                      onClick={() => handleSuggestionClick('Option 4')}
                      className="p-1 hover:cursor-pointer hover:bg-gray-100"
                    >
                      Option 4
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button className="bg-blue-600 w-1/5 text-sm md:w-auto md:text-lg text-white p-1 sm:p-2 rounded-r-lg border-2">SEARCH</button>
          </div>

          {/* Right Links */}
          <div className="flex items-center space-x-6">
            <div onClick={scrollToFooter} className="text-gray-600 hover:cursor-pointer sm:font-medium hidden sm:block">Need Help?</div>
            <div onBlur={() => handleLog()} tabIndex={0} onClick={() => setlogInfo((prev) => !prev)} className="text-gray-600 w-9 h-7 relative">
              <svg className='size-full hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
              {logInfo && <div onBlur={() => handleLog()} tabIndex={0} className='bg-white absolute mt-3 w-48 rounded-lg shadow-lg'>
                <ul className='p-2'>
                  <li className='p-1 hover:cursor-pointer font-medium'>Check Cart</li>
                  <li className='p-1 hover:cursor-pointer font-medium'><Link to={'/orders-placed'}>Placed Orders</Link></li>
                  <li className='p-1 hover:cursor-pointer font-medium'><Link to={"/login"}>Log In</Link></li>
                </ul>
              </div>}

            </div>
            <div className="flex items-center space-x-2 w-9 h-7">
              <Link to={"/cart"}><svg className='size-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg></Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
