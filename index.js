const express = require('express');

// To update the file with new users
const fs = require('fs')

const app = express();

const users  = require("./MOCK_DATA.json")

const PORT = 8000;



// Middleware - It is used to get the requested data in post method in json body for express.
app.use(express.urlencoded({extended:false}));

// Routes
//  It is for browser only because it is returing data in html format.
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((users) => `<li>${users.id}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

// It is for all like app,ios,alexa, browsers etc.
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

// Dynamic Path Parameter
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.send(user);
})


// POST Method

app.post('/api/users', (req,res) => {
    const user = req.body;
    // Before middleware
    // console.log(user) --> Output - undefined (Because express is not able to find the type of data that is requested. To find that we user ****Middleware****.)

    // After middleware use
    // console.log(user);

    users.push({...user, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data)=>{

        return res.json({status:"Success",id : users.length })
    })



})

// PATCH Method
app.patch('/api/users/:id',(req,res)=>{

    const user = req.body;

    const user = users.find((u) => u.id === user.id)


    return res.send({status :" patch pending"})

})

// DELETE Method
app.delete('/api/users/:id',(req,res)=>{
    return res.send({status : "delete pending"})

})


// We can use route also to add the api

// app.route('/api/users/:id').get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.send(user);
// })
// .patch((req,res))
// .delete((req,res))

// Listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})