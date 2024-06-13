const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs = require("bcryptjs")

const users = require("./models/blog")
const app = express()

const generateHashedPassword = async(password)=>{
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password,salt)

}

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Nivedhya_02:legacy123paru@cluster0.xztbusn.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0")
app.post("/signup", async(req,res) => 
{
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    input.password = hashedPassword
    let user = new users.userModel(input)
    user.save()  
    res.json({"status":"success"})
})

app.listen(8080,() => {
    console.log("server started")

})