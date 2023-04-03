const express = require('express');
const app = express();
const config = require('./config')

app.get('/servercheck', (req, res) => {
    res.json({ status: 'Server is running well without issues' });
});

const port = config.port;

app.listen(port, () => {
    console.log(`Server is running! Check out the link below for more information!`);
    console.log(`http://localhost:${port}/servercheck`);
});
