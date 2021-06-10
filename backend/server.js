const PORT = 5000;
const express = require('express');
const cors = require("cors");
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');
app.use('/api', routes);

//body-parser
routes.use(bodyParser.urlencoded({ extended: false}));
routes.use(bodyParser.json());
const jsonParser = bodyParser.json();
//cors
routes.use(cors());

//mongoDB client
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Cod3Lif3:aZERTYUIOP_973@cluster0.whwmt.mongodb.net/marketplace?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const DATABASE = "marketplace";
//connect to Server
app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
});

//connect to DB
client.connect(err =>{
    if(err){
        throw Error(err);
    }
    const products = client.db(DATABASE).collection("products");
    console.log("Sucessfully connected to database");
    //perform actions on the collection object
    routes.get("/products", (req,res) =>{
        products.find()
        .toArray()
        .then ((error, results) =>{
            if (error){
                return res.send(error);
            }
            res.status(200).send ({ results });
        })
        .catch((err) => res.send(err));
    });

    routes.post("/products/add", jsonParser, (req,res) =>{
        products.insertOne(req.body)
        .then(() => res.status(200).send({ message:"successfully inserted new products" }))
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
    });
});
routes.get("/", (req,res) =>{
    res.send("Hello World!");
});
