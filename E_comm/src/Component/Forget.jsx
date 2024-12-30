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
    
          const onSubmit = (data)=>{
            console.log("Printing the data : ", data);
            navigate('OTP');

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
