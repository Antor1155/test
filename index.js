const express = require('express')

const app = express()

const port = process.env.PORT || 5000

const {MongoClicne, objectId} = require('mongodb')

require('dotenv')

const cors = require("cors")

app.use(cors())
app.use(express.json())

async function run(){
    try{
        app.get("/", async(req, res) =>{
            let text = "test is going online"

            res.send(text)
        })

        app.get("/home", async(req, res) =>{
            let text = "test is going online from home"

            res.send(text)
        })
    }
    finally{

    }
}

run()

app.listen(port, ()=>{
    console.log("port is :", port)
})