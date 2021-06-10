const PORT = 5000;
const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
});

app.get("/", (req,res) =>{
    res.send("Hello World!");
});