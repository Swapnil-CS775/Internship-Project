import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Forget = () => {
  const navigate = useNavigate();
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()
    
          const onSubmit =async (data)=>{
            console.log("Printing the data : ", data);
            // Making the request to the backend
            try {
                const response = await fetch('http://localhost:3000/password-reset/request-otp', {
                  method: 'POST', // or 'GET' depending on your backend route
                  headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(data), // Send the data as JSON
              });

              if (response.ok) {
                // If the response is successful, navigate to OTP page
                const responseData = await response.json();  // Parse the response
                console.log('Message from backend :', responseData);
                navigate('OTP',{ state: { email: data.email } });
              } else {
              // Handle the error if the request fails
              console.error('Error sending OTP request:', response.statusText);
            }
            } catch (error) {
              console.error('Error making request:', error);
            }
          }
  return (
  <>
  <div className=" mt-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Forget Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border-2 rounded-lg  focus:border-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className='flex justify-center items-center'>
          <button
            type="submit"
            className="px-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
          </div>
          
        </form>
      </div>
    </div>
  </>
  )
}

export default Forget
