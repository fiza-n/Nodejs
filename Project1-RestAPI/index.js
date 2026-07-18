import express from 'express'
import users from './MOCK_DATA.json' with {type: 'json'}

const app = express()
const PORT = 8000


//for browser based data
app.get('/users', (req,res)=>{
    const html = `
    <ul>
    ${users.map(u => `<li>${u.first_name}, ${u.email}</li>`).join('')}
    </ul>`
    res.send(html);
})


//Routes-REST API Points
app.get('/api/users', (req,res)=>{
    res.json(users)
})

//ALL ROUTES WITH SAME ENDPOINT BUT DIFFERENT METHODS
app.route('/api/users/:id').get((req,res)=>{
const id = req.params.id;
    const user = users.find(u => u.id === parseInt(id))
    return res.json(user)
}).patch((req,res)=>{
    //TODO: EDIT user with id
  return res.json({status: "pending"})
})
.delete((req,res)=>{
    //TODO: delete user with id
   return res.json({status: "pending"})
})


app.post('/api/users',(req,res)=>{
   //TODO: Create user
   res.json({status: "pending"})
})





app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})