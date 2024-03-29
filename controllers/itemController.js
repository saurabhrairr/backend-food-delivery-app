// controllers/itemController.js
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { type, description } = req.body;
    const item = new Item({ type, description });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, description } = req.body;
    const item = await Item.findByIdAndUpdate(id, { type, description }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
