import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Convert data to FormData for sending to the server
      const formData = new FormData();
      formData.append('name', data.productName); // Ensure the key matches backend's expected field
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('brand', data.brand);
      formData.append('stockQuantity', data.stockQuantity);
      if (data.image) formData.append('image', data.image[0]); // Add the image file
  
      // Send the POST request to the backend using fetch
      const response = await fetch('http://localhost:3000/admin/add', {
        method: 'POST',
        headers: {
        },
        body: formData, // FormData automatically sets the correct `Content-Type`
        credentials:'include',
      });
  
      // Parse the JSON response
      const result = await response.json();
  
      if (!response.ok) {
        // Handle errors from the backend
        throw new Error(result.message || 'Failed to submit the product.');
      }
  
      // Handle success
      console.log('Response:', result);
      alert('Product submitted successfully!');
      reset(); // Reset the form
    } catch (error) {
      // Handle errors
      console.error('Error submitting product:', error.message);
      alert(error.message);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setValue('image', e.target.files); // Update form value
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue('image', null); // Remove image from form data
  };

  return (
    <>
    <h3 className='text-center font-bold text-2xl p-3 m-3'>Welcome To Admin Page</h3>
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h3 className="text-lg font-bold mb-4">Admin Navbar</h3>
        <ul className="space-y-4">
          <li>
            <button
              className="w-1/2 text-left px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Link to={'/admin'}>Add Products</Link>
            </button>
          </li>
          <li>
          <button
              className="w-1/2 text-left px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Link to={'/admin/update-delete'}>Update Products</Link>
            </button>
          </li>
          <li>
          <button
              className="w-1/2 text-left px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Link to={'/admin/update-delete'}>Delete Products</Link>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Form */}
      <div className="w-3/4 p-8 bg-white shadow-xlg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 shadow-lg p-6">
          <div>
            <label className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              {...register('productName', { required: 'Product name is required' })}
              className={`w-full border p-2 rounded-md ${
                errors.productName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`w-full border p-2 rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Price must be greater than 0' },
              })}
              className={`w-full border p-2 rounded-md ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Category</label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              className={`w-full border p-2 rounded-md ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Brand</label>
            <input
              type="text"
              {...register('brand', { required: 'Brand is required' })}
              className={`w-full border p-2 rounded-md ${
                errors.brand ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Stock Quantity</label>
            <input
              type="number"
              {...register('stockQuantity', {
                required: 'Stock quantity is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Stock quantity must be at least 0' },
              })}
              className={`w-full border p-2 rounded-md ${
                errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.stockQuantity && (
              <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: 'Image is required' })}
              // onChange={(e)=>{handleImageChange(e)}}
              className={`w-full border p-2 rounded-md ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
            {/* {imagePreview && (
              <div className="mt-4 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            )} */}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Admin;
