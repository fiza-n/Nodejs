import http from "http"
import express from "express"

const app = express()

app.get("/", (req,res)=>{
    res.send("Homepage")
})


app.get("/about", (req,res)=>{
    console.log(req)
    res.send("About page Hey,"+ req.query.name);
})

app.listen(8000, () => {
    console.log("Server is running on port 8000")
})

// const server = http.createServer(app)

// server.listen(8000, ()=>{
//     console.log("Server is running on port 8000")
// })