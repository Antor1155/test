const express = require('express')

const app = express()

const port = process.env.PORT || 5000

const {MongoClient, objectId} = require('mongodb')


require('dotenv').config()

//declearing mongodb
const userName = process.env.user
const passWord = process.env.pass
console.log("username and passwords are: ", userName, passWord)
const url = `mongodb+srv://${userName}:${passWord}@cluster0.js1z3.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url)


const cors = require("cors")

app.use(cors())
app.use(express.json())

async function run(){
    try{
        await client.connect()
        const productCollection = client.db("warehouseOfFoodCompany").collection("Products")

        app.get("/", async(req, res) =>{
            let text = "test is going online"
            const query = {};
            const cursor =  productCollection.find(query)
            const products = await cursor.limit(6).toArray()
            // console.log(products)

            

            res.send(products)
        })

        app.get("/home", async(req, res) =>{
            let text = userName + passWord

            res.send(text)
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.listen(port, ()=>{
    console.log("port is :", port)
})