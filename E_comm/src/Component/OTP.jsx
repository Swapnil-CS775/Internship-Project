import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,useLocation } from 'react-router-dom';


const OTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;  // Retrieve the email passed from the previous page

    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm();

          const onSubmit =async (data) => {
            console.log('OTP submitted:', data.otp);
            console.log('OTP submitted:', data.otp);
            console.log('Email:', email);

            const requestData = {
              email: email,  // Now you have the email from the previous page
              otp: data.otp,
            };
            try {
              const response = await fetch('http://localhost:3000/password-reset/verify-otp', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
              });
          
              if (response.ok) {
                const responseData = await response.json();  // Parse the response
                console.log('Message form backend:', responseData);
                navigate('set-password',{ state: { email} });
              } else {
                const errorData = await response.json();
                console.error('Error verifying OTP:', errorData.message);
              }
            } catch (error) {
              console.error('Error making the request:', error);
            }
          };        

  return (
    <>
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-medium">OTP</label>
            <input
              type="text"
              id="otp"
              {...register('otp', { 
                required: 'OTP is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'OTP must be 6 digits'
                }
              })}
              placeholder="Enter your OTP"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default OTP
