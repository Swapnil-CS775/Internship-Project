const User = require("../models/user"); // Assuming User model is in this path
const mongoose=require("mongoose");

const userController = async (req, res) => {
  try {
    // Fetch the user by ID (req.userId should be set by the middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Welcome to Profile",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cartController = async (req, res) => {
  try {
    // Find the user by ID and populate their cart
    const user = await User.findById(req.user.id).populate({
      path: "cartId", //The cartId field in the User model will be replaced with the entire Cart object.
      populate: {
        path: "items.productId", // Populate the product details
        model: "Product",
      },
    });

    if (!user || !user.cartId) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Ensure the total price is updated
    await user.cartId.updateTotalPrice();

    // Send the cart data to the frontend
    res.status(200).json({
      message: "Cart fetched successfully",
      cart: user.cartId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Function  to add items in cart
const addToCart = async (req, res) => {
  try {
      const { productId, quantity } = req.body;
      const parsedQuantity = parseInt(quantity, 10); // Convert to a number
    
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
          return res.status(400).json({ message: 'Quantity must be a positive number' });
      }
    
      const userId = req.user.id;

      const user = await User.findById(userId).populate('cartId');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const cart = user.cartId;
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Check if the product exists in the cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += parseInt(quantity, 10); // Ensure quantity is a number
        existingItem.addedAt = new Date(); // Update the addedAt timestamp
      } else {
        cart.items.push({ productId, quantity: parseInt(quantity, 10) });
      }

      await cart.updateTotalPrice();
      await cart.save();

      // Format `addedAt` to IST
      const formattedCart = {
        ...cart.toObject(),
        items: cart.items.map(item => ({
        ...item.toObject(),
        addedAt: new Date(item.addedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        })),
      };
      res.status(200).json({ message: 'Item added to cart successfully', cart: formattedCart});
  } catch (error) {
      res.status(500).json({ message: error.message});
  }
};

//Remove items form cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID

    // Find the user and populate the cart
    const user = await User.findById(userId).populate('cartId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = user.cartId;
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the cart and update the total price
    await cart.save();
    await cart.updateTotalPrice();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body; // Get productId and action (increase/decrease) from the request body
    const userId = req.user.id; // Assume `req.user.id` is set by the authentication middleware

    // Find the user's cart and populate the items
    const user = await User.findById(userId).populate('cartId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = user.cartId;
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart items
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (!existingItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Increment or decrement the quantity based on the action
    if (action === 'increase') {
      existingItem.quantity += 1; // Increase the quantity by 1
    } else if (action === 'decrease' && existingItem.quantity > 1) {
      existingItem.quantity -= 1; // Decrease the quantity by 1, but not below 1
    } else {
      return res.status(400).json({ message: 'Cannot decrease quantity below 1' });
    }

    // Save the cart
    await cart.save();

    // Update the total price after quantity change
    await cart.updateTotalPrice();

    // Respond with the updated cart
    res.status(200).json({
      success: true,
      message: 'Quantity updated successfully',
      cart: cart, // Return the updated cart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { userController, cartController,addToCart,removeFromCart,updateCartQuantity};
