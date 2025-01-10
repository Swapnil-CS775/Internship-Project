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
import AuthLayout from './Auth/AuthLayout'


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
      element : (
        <AuthLayout authentication = {false}>
          <Navbar/>
           <Login/>
        </AuthLayout>
      )
    },
    {
      path:"/register",
      element :(
            <AuthLayout authentication={false}>
              <><Navbar/> <Register/></>
            </AuthLayout>
      ) 
    },
    {
      path : "/login/forget-password",
      element :(
        <AuthLayout authentication={false}>
          <><Navbar/> <Forget/></>
        </AuthLayout>
  ) 
    },
    {
      path : "/cart",
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/> <Cart/> </>
        </AuthLayout>
      )
    },
    {
      path : '/cart/payment',
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/> <Cart/><Payment/> </>
        </AuthLayout>
      )
    },
    {
      path : '/login/forget-password/OTP',
      element : (
        <AuthLayout authentication={false}>
          <><Navbar/> <OTP/></>
        </AuthLayout>
      )
    },
    {
      path : '/login/forget-password/OTP/set-password',
      element : (
        <AuthLayout authentication={false}> 
        <><Navbar/> <Reset/></>
        </AuthLayout>
      )
    },
    {
      path : '/admin',
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/><Admin/></>
        </AuthLayout>
      ) 
    },
    {
      path: '/admin/update-delete',
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/><UpdateforAdmin/></>
        </AuthLayout>
      ) 
    },
    {
      path: '/admin/update-delete/update-product',
      element : (
        <AuthLayout authentication={true}>
         <><Navbar/><Update_product/></>
        </AuthLayout>
      ) 
    },
    {
      path : '/orders-placed',
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/><User_oreder/></>
        </AuthLayout>
      )
    },
    {
      path : '/admin/orders',
      element : (
        <AuthLayout authentication={true}>
          <><Navbar/><AdminOrders/></>
        </AuthLayout>
      )
    },
    {
      path : '/admin/orders/view',
      element : (
        <AuthLayout authentication={true}>
         <><Navbar/><AdminProductView/></>
        </AuthLayout>
      )
    }
  ])
  return (
    <>
     <RouterProvider router = {router}/>
    </>
  )
}

export default App
