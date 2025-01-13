import React, { useState, useEffect }  from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const Protected = ({children,authentication}) => {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()
  const [loader, setloader] = useState(true)

  console.log("Printing the loader(Upper) : ", loader)

  useEffect(() => {
    if(authentication && authentication !== authStatus){
      navigate('/login')
    }
    else if(!authentication && authentication !== authStatus){
      navigate('/');
    }
    setloader(false);
    console.log("Printing the loader  : ", loader);
  
  }, [authStatus, authentication, navigate])
  


  return loader ?  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  {/* Spinning Loader */}
  <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  {/* Message */}
  <p className="mt-4 text-gray-700 text-lg font-semibold">
    You don't have access to this page. Please check the validation step.
  </p>
</div> : <>{children}</>
}

export default Protected
