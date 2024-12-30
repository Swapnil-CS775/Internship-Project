import React from "react";

const Best_deals = () => {
  const categories = [
    {
      title: "Television",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-television-300x248.png",
      links: ["55'' TVs", "65'' TVs", "OLED TVs", "QLED TVs"],
    },
    {
      title: "Headphones",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-headphone-300x248.png",
      links: ["AirPods", "Gaming Headsets", "Kids' Headphones", "Wireless Earbuds"],
    },
    {
      title: "Camera",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-camera-300x248.png",
      links: ["Accessories", "Camera & Lenses", "Drones", "Security Cameras"],
    },
    {
      title: "Smartphone",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-phone-300x248.png",
      links: ["iPhone", "Prepaid Phones", "Samsung Galaxy", "Unlocked Phones"],
    },
    {
      title: "Games",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-headphone-300x248.png",
      links: ["Accessories", "Playstation 4", "Playstation 5", "Xbox Series"],
    },
    {
      title: "Speaker",
      image: "https://ecomall-be87.kxcdn.com/ecomall/wp-content/uploads/2023/10/cat-headphone-300x248.png",
      links: [
        "Bluetooth Speakers",
        "Portable Speakers",
        "Professional Speakers",
        "Waterproof Speakers",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Deal Of The Day</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <img
                src={category.image}
                alt={category.title}
                className="w-20 h-20 object-cover mr-4 rounded"
              />
              <div>
                <h3 className="text-lg font-bold">{category.title}</h3>
                <ul className="mt-2 text-sm text-gray-500">
                  {category.links.map((link, i) => (
                    <li key={i} className="hover:text-blue-600 transition">
                      {link}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-2 block text-blue-600 font-semibold hover:underline"
                >
                  Shop More &gt;&gt;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Best_deals;
