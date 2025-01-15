import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdateforAdmin = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        fetch('http://localhost:3000/product') // Replace with your actual API URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Products fetched from backend:', data);
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Handle product deletion
    const handleDelete = (product) => {
        alert('You want to delete this product..?'); // User feedback
        alert('Changes will be permanent'); // User feedback
        fetch(`http://localhost:3000/admin/delete/${product._id}`, {
            method: 'PATCH',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                console.log(`Product ${product._id} deleted successfully`);
                setProducts(products.filter((p) => p._id !== product._id)); // Update state
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.'); // User feedback
            });
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-3/4 m-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
                    >
                        <div className="relative">
                            <img
                                src={`http://localhost:3000/${product.image}`}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-t-md"
                            />
                            {product.discount && (
                                <span className="absolute top-2 left-2 bg-red-400 text-white text-xs px-2 py-1 rounded">
                                    {product.discount}
                                </span>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 min-h-10">{product.name}</p>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-red-500 font-bold">{product.price}</p>
                                {product.oldPrice && (
                                    <p className="text-gray-400 line-through">{product.oldPrice}</p>
                                )}
                            </div>
                            <p className="text-yellow-400 text-sm">{product.rating}</p>
                            <div className="flex justify-center items-center">
                                <button
                                    className="mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                                >
                                    <Link to={'update-product'} state={[product]}>
                                        Update
                                    </Link>
                                </button>
                                <button
                                    className="mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                                    onClick={() => handleDelete(product)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateforAdmin;
