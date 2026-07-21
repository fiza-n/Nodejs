import User from "../models/user.js"

async function handleAllGetUsers(req,res){
     
    const users = await User.find({})
     return res.json(users);
}
async function handleGetUserByID(req,res) {
     const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({
          message: "User not found"
        })
        return res.json(user);
}
async function handleUpdateUserByID(req,res) {
    
  await User.findByIdAndUpdate(req.params.id, {last_name:"khan" })
      
 return res.json({ status: "success", message: "User updated successfully" });
}

async function handleDeleteUserByID(req,res) {
    await User.findByIdAndDelete(req.params.id)
      
    
          return res.json({
            status: "success",
            message: "User deleted successfully",
          })
}


async function handleCreateUserByID(req,res) {
      const body = req.body;
      // if(!body || req.email === undefined || req.email === null || req.email === ""){
      //   return res.status(400).json({
      //     status:"Incomplete Data",
      //     message:"Email is required"
      //   })
      // }
      const result  = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email:body.email,
      job_title: body.job_title,
      gender: body.gender
      
     })
     return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result
     })
}

export{
    handleAllGetUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID, 
    handleCreateUserByID
}