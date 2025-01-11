const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Place an order
exports.placeOrder = async (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items are required.' });
  }

  try {
    let totalAmount = 0;
    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${item.menuItemId} not found.` });
      }
      totalAmount += menuItem.price * item.quantity;
    }

    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      status: 'Pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get all orders of a logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.menuItemId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
