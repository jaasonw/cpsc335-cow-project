const express = require('express')
const cors = require('cors')
const app = express()
var path = require("path");

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
    res.sendFile("./static/delicate.txt", { root: __dirname });
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Hosting server on port: ${PORT}`);
})