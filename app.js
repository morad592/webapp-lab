const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js app deployed on Azure!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
