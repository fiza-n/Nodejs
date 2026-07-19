import express from "express";
import users from "./MOCK_DATA.json" with { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;

//for browser based data
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((u) => `<li>${u.first_name}, ${u.email}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.use((req,res,next)=>{
    console.log("Middleware 1");
    fs.appendFile("log.txt", `\n${Date.now()}, ${req.method}, ${req.path}`,(err,data)=>{
        next();
    })
    //return res.json({msg:"Middleware 1"})//ths will stop the request and response cycle and will not go to next middleware or route handler
    
})

// app.use((req,res,next)=>{
    //     console.log("Middleware 2");
    //     next();
    
    // })
    
    //Routes-REST API Points
    app.get("/api/users", (req, res) => {
      console.log(req.headers)
      res.setHeader("X-myname", "fiza noor");//custom headers
      //its a good practice to always add X infront of custom headers
        res.json(users);
    });
    
    app.use(express.urlencoded({extended: false}));
//ALL ROUTES WITH SAME ENDPOINT BUT DIFFERENT METHODS
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id === parseInt(id));
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: EDIT user with id
    const id = req.params.id;
    const body = req.body;
    const index = users.findIndex((u) => u.id === parseInt(id));

    if(index === -1){
        return res.json({
            status:"error",
            message:"User not found"
        })
    }
    
    users[index] = {
        ...users[index],
        ...body
    }

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating user" });
      }

    return res.json({ status: "success", message: "User updated successfully" });
  })
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const filtered = users.filter((user) => user.id !== id);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filtered), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting user" });
      }

      return res.json({
        status: "success",
        message: "User deleted successfully",
      });
    });
  });


app.post("/api/users", (req, res) => {
  //TODO: Create user
  const body = req.body;
  console.log(body);

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (!err)
      return res.json({
        status: "success",
        message: "User created successfully",
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
