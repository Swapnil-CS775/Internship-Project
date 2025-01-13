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
      <h2 className="text-2xl font-semibold mb-6 text-center">Deal Of The Day</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
          >
            <div className="flex-shrink-0">
              <img
                src={category.image}
                alt={category.title}
                className="hover:scale-110 w-32 h-32 object-contain rounded mb-4"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">{category.title}</h3>
              <ul className="mt-2 text-sm text-gray-500 space-y-1">
                {category.links.map((link, i) => (
                  <li key={i} className="hover:text-blue-600 transition">
                    {link}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-2 inline-block text-blue-600 font-semibold hover:underline"
              >
                Shop More &gt;&gt;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Best_deals;
