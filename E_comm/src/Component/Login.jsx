import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    console.log("Printing the form data", data);
    reset();
    toast("Login Succesful", { autoClose : 2000});
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <>
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
          theme="light"
          />

    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email or Phone */}
        <div className="mb-4">
          <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">
            Email or Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="emailOrPhone"
            {...register("emailOrPhone", {
              required: "This field is required",
              validate: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                /^[0-9]{10}$/.test(value) ||
                "Enter a valid email or phone number",
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.emailOrPhone ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
    </>
  )
}

export default Login
