const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ol08zse.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toysCollection = client.db('toyMarket').collection('toys');

    app.get('/toys',async(req,res)=>{
        const cursor =toysCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // app.get("/singleJob/:id", async (req, res) => {
    //   console.log(req.params.id);
    //   const jobs = await jobsCollection.findOne({
    //     _id: new ObjectId(req.params.id),
    //   });
    //   res.send(jobs);
    // });
    
    app.get("/toys/:id",async (req, res) => {
      console.log(req.params.id);

      const toy = await toysCollection.findOne({
        _id: new ObjectId(req.params.id),
      })

      res.send(toy);
      
    });

    app.get('/allToys/sportsCar', async(req,res)=>{
      const t= 'Sports Car';
      const result = await toysCollection.find({category: t}).toArray();

    res.send(result);
    })
    app.get('/allToys/policeCar', async(req,res)=>{
      const t= 'Police Car';
      const result = await toysCollection.find({category: t}).toArray();

    res.send(result);
    })
    app.get('/allToys/regularCar', async(req,res)=>{
      const t= 'Regular';
      const result = await toysCollection.find({category: t}).toArray();

    res.send(result);
    })
    app.get('/allToys/truck', async(req,res)=>{
      const t= 'Truck';
      const result = await toysCollection.find({category: t}).toArray();

    res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
