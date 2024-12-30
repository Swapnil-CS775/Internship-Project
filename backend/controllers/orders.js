const User=require("../models/user");
const checkout = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch user and populate cart details
      const user = await User.findById(userId).populate({
        path: 'cartId',
        populate: {
          path: 'items.productId',
          model: 'Product',
        },
      });
  
      if (!user || !user.cartId) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const cart = user.cartId;
  
      // Calculate total price of cart items
      let totalPrice = 0;
      const cartItems = cart.items.map(item => {
        if (item.productId && item.productId.price) {
          const itemTotal = item.quantity * item.productId.price;
          totalPrice += itemTotal;
          return {
            name: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price,
            total: itemTotal,
          };
        } else {
          console.warn(`Missing product or price for item: ${item._id}`);
          return null;
        }
      }).filter(item => item !== null);
  
      // Determine shipping charges based on the user's city
      const city = user.address.city.toLowerCase();
      const shippingCharges = city === "baramati" ? 0 : 50;
  
      // Calculate the final billing price
      const billingPrice = totalPrice + shippingCharges;
  
      // Return the response
      res.status(200).json({
        cartItems,
        totalPrice,
        shippingCharges,
        billingPrice,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  module.exports=checkout;