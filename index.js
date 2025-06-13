const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@plant-trackr.jrovdxz.mongodb.net/?retryWrites=true&w=majority&appName=plant-trackr`;

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
        // post api
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
        app.get("/plants", async (req, res) => {
            const result = await plantCollection.find().toArray();
            res.send(result)
        })
        app.get("/singleplants/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await plantCollection.findOne(query);
            res.send(result)
        })
        // get plant added my users
        app.get('/myplants', async (req, res) => {
            try {
                const email = req.query.email;
                const query = { userEmail: email };
                const result = await plantCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).json({ error: "Server error" });
            }
        });
        app.put("/updateplants/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedData = req.body;
            const updatedDoc = {
                $set: updatedData
                
            }
            const result = await plantCollection.updateOne(query, updatedDoc);
            res.send(result)
        })


        app.delete("/plants/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await plantCollection.deleteOne(query);
            res.send(result)
        });

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