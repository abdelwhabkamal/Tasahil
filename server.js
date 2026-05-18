const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const jsonPath = path.join(__dirname, 'public/assets/data/universities.json');

// Get Universities
app.get('/api/universities', (req, res) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.send(JSON.parse(data));
    });
});

// Save Universities
app.post('/api/universities', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFile(jsonPath, data, 'utf8', (err) => {
        if (err) return res.status(500).send('Error writing file');
        res.send({ message: 'Saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Admin Server running on http://localhost:${PORT}`);
});
