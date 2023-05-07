const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const {MongoClient} = require('mongodb')


require('dotenv').config()

//declearing mongodb
const userName = process.env.user
const passWord = process.env.pass

const uri = `mongodb+srv://${userName}:${passWord}@cluster0.js1z3.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)


const cors = require("cors")

app.use(cors())
app.use(express.json())

async function run(){
    try{
        await client.connect()
        const productCollection = client.db("warehouseOfFoodCompany").collection("Products")

        app.get("/", async(req, res) =>{
            // let products = ["hello", "how", "are", "you"]
            const query = {};
            const cursor =  productCollection.find(query)
            let products = await cursor.limit(6).toArray()


            res.send(products)
        })

        app.get("/home", async(req, res) =>{
            let text ="text is :" + userName + passWord

            res.send(text)
        })
        app.get("/main", async(req, res) =>{
            let text ="text is : form main"

            res.send(text)
        })
    }
    catch(error){console.log(error)}
    finally{

    }
}

run().catch(console.dir)

app.listen(port, ()=>{
    console.log("port is :", port)
})