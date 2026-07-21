import express from "express";
import userRouter from "./routes/user.js"
import DBconnect from "./connection.js"
import logRequest from "./middlewares/index.js"

const app = express();
const PORT = 8000;
//connection
DBconnect("mongodb://127.0.0.1:27017/userdb")

//middlewares
app.use(logRequest('log.txt'))


//routes
app.use("/api/users", userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
