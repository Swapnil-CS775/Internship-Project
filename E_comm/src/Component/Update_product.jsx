import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Update_product = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const productData = location.state;

    console.log("type of product data : ",typeof(productData));
    console.log("product data is  : ",productData);
    console.log("Id = : ",productData[0]._id);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Make a PUT request to the backend to update the product
            const response = await fetch(`http://localhost:3000/admin/update/${productData[0]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the updated data
                credentials:'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            console.log('Updated Product:', updatedProduct);

            alert("Product updated successfully!");
            navigator('/admin/update-delete'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    };

  

    
  return (
    <>
       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-3xl bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Update Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">Product Name</label>
                        <input
                        defaultValue={productData[0].name}
                        onChange={(e)=>{setValue("name", e.target.value, { shouldValidate: true })}}
                            {...register("name", { required: "Product name is required" })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Description</label>
                        <textarea
                         defaultValue={productData[0].description}
                         onChange={(e)=>{setValue("description", e.target.value, { shouldValidate: true })}}
                            {...register("description", {
                                required: "Description is required",
                            })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Price ($)</label>
                        <input
                            type="text"
                            defaultValue={productData[0].price}
                            onChange={(e)=>{setValue("price", e.target.value, { shouldValidate: true })}}
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" },
                            })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Category</label>
                        <input
                             defaultValue={productData[0].category}
                             onChange={(e)=>{setValue("category", e.target.value, { shouldValidate: true })}}
                            {...register("category", { required: "Category is required" })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Brand</label>
                        <input
                         defaultValue={productData[0].brand}
                         onChange={(e)=>{setValue("brand", e.target.value, { shouldValidate: true })}}
                            {...register("brand", { required: "Brand is required" })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            defaultValue={productData[0].stockQuantity}
                            onChange={(e)=>{setValue("stockQuantity", e.target.value, { shouldValidate: true })}}
                            {...register("stockQuantity", {
                                required: "Stock quantity is required",
                                min: { value: 0, message: "Stock must be positive" },
                            })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.stockQuantity && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stockQuantity.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Update_product
