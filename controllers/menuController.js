const Menu = require('../models/Menu');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  const { name, category, price, availability } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const menuItem = new Menu({ name, category, price, availability });
    await menuItem.save();
    res.status(201).json({ message: 'Menu item added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedItem = await Menu.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
