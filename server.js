require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongose = require ('mongoose')
const cors = require('cors')

const constants = require('./constants')
const database = require('./database')
const controller = require('./controller')
const {MESSAGES} = constants

app.use(cors())
app.use(express.json())

// mongose.connect(process.env.DATABASE_URI,{useNewUrlParser:true})

// db = mongose.connection
// db.on('error',(error)=>console.error(error))
// db.once('open',()=>console.log('Connected to database'))

// app.listen(3000, () => console.log("server is working"))

const PORT = process.env.PORT || 5000

app.get("/",(req,res) => {
    res.status(200).send({message:MESSAGES.FETCHED, success:true, data:users })
})

//base api
app.post('/api/v1/rooms-types',async(req,res) =>{
    try{
        const data =  await controller.addRoom(req.body)
        res.status(201).send({message: MESSAGES.CREATED, success:true,data})
    }
    catch(err){
        res.status(501).send({message: err.message|| MESSAGES.ERROR, success: false})
    }
})

app.get ('/api/v1/room-types', async(req,res) => {
    try{
        const users = await controller.getAllRoom()
        res.status(202).send({message: MESSAGES.CREATED, success:true, data:users})
    }
    catch(err){
        res.status(202).send({message: err.message|| MESSAGES.ERROR, success: false})
    }
})

app.get('/api/v1/rooms', async (req, res) => {
    try {
        let query = {};

        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }

        if (req.query.roomType) {
            query.roomType = ObjectId(req.query.roomType);
        }

        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) {
                query.price.$gte = parseInt(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                query.price.$lte = parseInt(req.query.maxPrice);
            }
        }

        const rooms = await roomsCollection.find(query).toArray();
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(503).send({message: err.message|| MESSAGES.ERROR, success: false});
    }
});

// PATCH endpoint for editing a room
app.patch('/api/v1/rooms/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const updatedRoom = req.body;

        await roomsCollection.updateOne({ _id: ObjectId(roomId) }, { $set: updatedRoom });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE endpoint for deleting a room
app.delete('/api/v1/rooms/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;

        await roomsCollection.deleteOne({ _id: ObjectId(roomId) });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint for fetching a room by id
app.get('/api/v1/rooms/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;

        const room = await roomsCollection.findOne({ _id: ObjectId(roomId) });
        if (!room) {
            res.status(404).send('Room not found');
            return;
        }

        res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



