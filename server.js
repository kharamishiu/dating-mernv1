import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Cors from 'cors';
import Card from './dbCards.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;
const client = new MongoClient(process.env.RK_URI);

//db config
//dos maneras de conectar a la bd y diferentes para obtener las rutas post/get etc
/*client.connect((err, cli) => {
    if (err) {
        console.log(err)
    } else {

        const collection = cli.db("rioko").collection("cards");
        console.log(collection)
        console.log('connected to Mongo DB');
        //listen server
        app.listen(port, () => {
            console.log(`Server running in ${port}`)
        })
    }

});*/

mongoose.connect(process.env.RK_URI)
    .then(() => {
        console.log('connected to Mongo DB');
        //listen server
        app.listen(port, () => {
            console.log(`Server running in port ${port}`)
        })
    })
    .catch(err =>
        console.log(new Error(err))
    )


//middleware
app.use(express.json());
//app.use(Express.urlencoded({ extended: true }))
app.use(Cors());



//API ENDPOINT
app.get('/', (req, res) =>
    res.status(200).send('Helloo Rioko *')
);
app.post('/dating/cards', async (req, res) => {

    const dbCard = req.body;
    try {
        await Card.create(dbCard);
        res.send('Card add to db');

    } catch (err) {
        console.log(err)
    }
});

app.get('/dating/cards', (req, res) => {
    Card.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});


