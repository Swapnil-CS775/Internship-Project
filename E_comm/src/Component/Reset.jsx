import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,useLocation } from 'react-router-dom'

const Reset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;  // Retrieve the email passed from the previous page

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { newPassword, confirmPassword } = data;  // Extract the new and confirmed password from form data
      
        const requestData = {
          email: email,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        };
      
        try {
          const response = await fetch('http://localhost:3000/password-reset/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (response.ok) {
            const responseData = await response.json();  // Parse the response from backend
            console.log('Message from backend', responseData);  // Log the success response
            navigate('/login');  // Navigate to the login page
          } else {
            const errorData = await response.json();  // Parse error response from backend
            console.error('Error updating password:', errorData.message);
            alert(`Error: ${errorData.message}`);  // Display error message to the user
          }
        } catch (error) {
          console.error('Error making the request:', error);
          alert('An unexpected error occurred. Please try again.');
        }
      };
    return (
        <>
            <div className="mt-10 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-4">Set New Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                {...register('newPassword', {
                                    required: 'New password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                placeholder="Enter new password"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: value => value === watch('newPassword') || 'Passwords do not match'
                                })}
                                placeholder="Confirm new password"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
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

export default Reset
