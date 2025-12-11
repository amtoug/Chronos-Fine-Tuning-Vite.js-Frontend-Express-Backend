const express = require('express')
const app = express()
const port = 3000
const cors=require("cors")
const fs=require("fs")
const path=require("path")

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const jsonFilePath=path.join(__dirname,"data.json")
app.get('/data', (req, res) => {
  fs.readFile(jsonFilePath,"utf-8",(err,data)=>{
    try{
        const jsonData=JSON.parse(data)
        res.json(jsonData)
    }catch(err) {
        console.log("Err:"+err)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})