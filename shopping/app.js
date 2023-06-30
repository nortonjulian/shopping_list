const express = require('express');
const items = require('./fakeDb');

const app = express();
app.use(express.json());

// GET /items - get a list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - add an item to the shopping list
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name - get a single item's name and price
app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);

  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// PATCH /items/:name - modify a single item's name and/or price
app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;
  const foundItem = items.find(item => item.name === itemName);

  if (foundItem) {
    foundItem.name = updatedItem.name || foundItem.name;
    foundItem.price = updatedItem.price || foundItem.price;
    res.json({ updated: foundItem });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:name - delete a specific item
app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const itemIndex = items.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = app;
