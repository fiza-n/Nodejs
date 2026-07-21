import express from "express"
import DBConnect from "./connection.js"
import urlRoute from "./routes/routes.js"
const app = express();
const PORT = 8000


DBConnect("mongodb://127.0.0.1:27017/urldb")

app.use(express.json())
app.use("/url", urlRoute)
app.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})

