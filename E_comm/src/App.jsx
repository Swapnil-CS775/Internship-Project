import { useState } from 'react'
import Navbar from './Component/Navbar'
import About from './Component/About'
import Login from './Component/Login'
import Body from './Component/Body'
import Footer from './Component/Footer'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Register from './Component/Register'
import Forget from './Component/Forget'
import Best_deals from './Component/Best_deals'
import Cart from './Component/Cart'
import Payment from './Component/Payment'

function App() {
  const router = createBrowserRouter([
    {
      path : "/about",
      element : <><Navbar/> <About/></>
    },
    {
      path : "/",
      element : <><Navbar/> <Body/> <Best_deals/>
     <Footer/></>
    },
    {
      path:"/login",
      element : <><Navbar/> <Login/></>
    },
    {
      path:"/register",
      element : <><Navbar/> <Register/></>
    },
    {
      path : "/forget-password",
      element : <><Navbar/> <Forget/></>
    },
    {
      path : "/cart",
      element : <><Navbar/> <Cart/> </>
    },
    {
      path : '/cart/payment',
      element : <><Navbar/><Payment/></>
    }
  ])
  return (
    <>
    
     <RouterProvider router = {router}/>

    </>
  )
}

export default App
