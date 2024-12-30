import React from 'react'
import { useForm } from 'react-hook-form'

const Forget = () => {
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()
    
          const onSubmit = (data)=>{
            console.log("Printing the data : ", data);
          }
  return (
    <div>
    <div className='flex items-center justify-center w-full'>
      <div className='w-1/3 border-2 bg-green-200 mt-4 rounded-lg'>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='m-6 flex flex-col justify-center items-center flex-wrap'>
          {errors.username && <div>"something error"</div>}
          <input {...register("username", { required: true, maxLength: 20 })} className='w-1/2 m-2 border-2 p-1 rounded-lg ' type="text" placeholder='Username'/>
          {errors.password && <div className='text-red-500 text-sm'>{errors.password.message}</div>}
          <input type="text" {...register("OTP", { required:{value:true, message:"This feild is required*"}, minLength:{value:5,message:"Min lenght is 5*"}})} placeholder='OTP' className='w-1/2 m-2 border-2 p-1 rounded-lg '/>
          <input type="submit" value="Submit" className='block hover:cursor-pointer p-2 rounded-lg bg-green-400 my-2'/>
        </form>
      </div>
    </div>

  </div>
  )
}

export default Forget
