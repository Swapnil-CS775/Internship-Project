import React, {useState} from 'react'
import { Link } from 'react-router-dom';


const UpdateforAdmin = () => {
    let products1 = [
        {
            id: 1,
            name: "Laptop 14” 8-core CPU, M2 2022, 8GB | 256GB, New",
            image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
            price: "$1,359.00",
            oldPrice: "$1,584.00",
            discount: "-14%",
            rating: "⭐⭐⭐⭐⭐",
        },
        {
            id: 2,
            name: "MacBook Pro 13.3” 16GB/512GB Silver",
            image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
            price: "$1,527.00",
            oldPrice: "$1,795.00",
            discount: "-15%",
            rating: "⭐⭐⭐⭐⭐",
        },
        {
            id: 3,
            name: "Ultra Thin Laptop, Intel Celeron, 4GB RAM, 320GB HDD",
            image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
            price: "$707.00",
            oldPrice: "$875.00",
            discount: "-19%",
            rating: "⭐⭐⭐⭐",
        },
        {
            id: 4,
            name: "Laptop 2 in 1 9420 Core i7, Windows 11 Pro",
            image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
            price: "$2,851.00",
            oldPrice: null,
            discount: null,
            rating: "⭐⭐⭐",
        },
        {
            id: 5,
            name: "HP 14” Convertible 2-in-1 Chromebook Laptop",
            image: "https://demo.theme-sky.com/ecomall/wp-content/uploads/2023/03/04-400x400.jpg",
            price: "$379.99",
            oldPrice: null,
            discount: "HOT",
            rating: "⭐⭐⭐⭐",
        },
    ];

    const [products, setproducts] = useState(products1);
    const HandleClick = (product) => {
        console.log("Click ho gaya bhai",product)
        setproducts(products.filter(p => p.id !== product.id));
        console.log(products);
    };
    return (
        <div className='w-full flex justify-center items-center'>
            <div className="w-3/4 m-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
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
                            <div className='flex justify-center items-center'>
                                <button className={`mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700`}>
                                <Link to={'update-product'} state={[product]}> Update</Link>
                                </button>
                                <button className="mt-4 ml-8 w-3/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700" onClick={()=>{HandleClick(product)}}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpdateforAdmin
