const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
//plant-trackr1310
//hl1CC50BqZjQTM72


const uri = "mongodb+srv://plant-trackr1310:hl1CC50BqZjQTM72@plant-trackr.jrovdxz.mongodb.net/?retryWrites=true&w=majority&appName=plant-trackr";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const plantCollection = client.db('plant-trackr').collection('plants');
         app.post('/plants', async (req, res) => {
            const plants = req.body;
            try {
                const result = await plantCollection.insertOne(plants);
                res.send(result)
            }
            catch (error) {
                res.status(500).send({ error: "failed to add plants" })
            }

        })
       
        // Send a ping to confirm a successful connection
        console.log("connected to mongodb");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log("app is listening on port", port);
})