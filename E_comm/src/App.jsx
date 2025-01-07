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
import OTP from './Component/OTP'
import Reset from './Component/Reset'
import Admin from './Component/Admin'
import UpdateforAdmin from './Component/UpdateforAdmin'
import Update_product from './Component/Update_product'
import User_oreder from './Component/User_oreder'
import AdminOrders from './Component/AdminOrders'
import AdminProductView from './Component/AdminProductView'

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
      path : "/login/forget-password",
      element : <><Navbar/> <Forget/></>
    },
    {
      path : "/cart",
      element : <><Navbar/> <Cart/> </>
    },
    {
      path : '/cart/payment',
      element : <><Navbar/><Payment/></>
    },
    {
      path : '/login/forget-password/OTP',
      element : <><Navbar/> <OTP/></>
    },
    {
      path : '/login/forget-password/OTP/set-password',
      element : <><Navbar/> <Reset/></>
    },
    {
      path : '/admin',
      element : <><Navbar/><Admin/></>
    },
    {
      path: '/admin/update-delete',
      element : <><Navbar/><UpdateforAdmin/></>
    },
    {
      path: '/admin/update-delete/update-product',
      element : <><Navbar/><Update_product/></>
    },
    {
      path : '//orders-placed',
      element : <><Navbar/><User_oreder/></>
    },
    {
      path : '/admin/orders',
      element : <><Navbar/><AdminOrders/></>
    },
    {
      path : '/admin/orders/view',
      element : <><Navbar/><AdminProductView/></>
    }
  ])
  return (
    <>
    
     <RouterProvider router = {router}/>

    </>
  )
}

export default App
