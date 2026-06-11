const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/soutenance';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // Exit if connection fails to trigger container restart
  });

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newItem = new Item({ name: req.body.name });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
