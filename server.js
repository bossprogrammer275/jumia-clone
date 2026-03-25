require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = 'https://marketscan.onrender.com/';
const API_KEY = process.env.API_KEY || 'msk_live_279bae7f2e4f99ebdcc65bd61dd7d78e191bca9f';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, message: 'Query parameter required' });
        }

        const response = await axios.get(`${BASE_URL}api/search`, { params: { q }, headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' } });
        res.json(response.data);
    } catch (error) {
        console.error('Search Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/details', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID parameter required' });
        }

        const response = await axios.get(`${BASE_URL}api/details`, { params: { id }, headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' } });
        res.json(response.data);
    } catch (error) {
        console.error('Details Error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API Base URL: ${BASE_URL}`);
});
