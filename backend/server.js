const PORT = 5000;
const express = require('express');
const cors = require("cors");
const app = express();

//cors
app.use(cors());

//mongoDB client
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Cod3Lif3:aZERTYUIOP_973@cluster0.whwmt.mongodb.net/marketplace?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//connect to Server
app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
});

//connect to DB
client.connect(err =>{
    if(err)
        throw Error(err);
    const collection = client.db("marketplace").collection("products");
    console.log("Sucessfully connected to database");
    //perform actions on the collection object
    client.close();
});
app.get("/", (req,res) =>{
    res.send("Hello World!");
});

app.get("/products", (req, res)=> {
    res.send("liste de produits");
})