const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.use(express.json());

async function fetchNumbersFromUrl(url) {
    try {
        const response = await axios.get(url, { timeout: 5000 }); // Timeout set to 5 seconds
        if (response.data && response.data.numbers) {
            return response.data.numbers;
        }
        return
