const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const users = require('./Data/Users.json');


app.use(cors());
app.use(express.json());
app.get('/', (req, res)=> {
    res.send('Hello my server is done')
})

const uri = "mongodb+srv://myfirstDB:EVj0gQp8QT7mHMgz@cluster0.io31lql.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        const userCollection = client.db('simpleNode').collection("user");
        // const user = {name: 'jahangir maih', email: 'jahangirmiah@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result)
        app.get( '/users', async(req ,res)=> {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })
        app.post('/users', async (req, res)=> {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            user.id = result.insertedId
            console.log(result)
            res.send(user);
        })
    }
    finally{

    }
}
run().catch(error=> console.log(error))

// app.get('/users', (req, res)=> {
//     res.send(users);
// })

app.listen(port, ()=> {
    console.log(`Nature-server is running port: ${port}`)
})