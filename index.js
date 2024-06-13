const express = require("express")
const  app = express()
const cors = require("cors")
const mongoose =require("mongoose")

app.use(cors())
app.use(express.json())

const schemaData =mongoose.Schema({
    name: String,
    std: Number,
    email: String,
    contactno: Number,
    address: String,
},{
    timestamps: true
}
)

const userModel =mongoose.model("user",schemaData)

//read 
app.get("/",async (req,res)=>{
    const data =await userModel.find({})
    // res.json({success: true,data:data})

    res.json({success: true,data:data})

    //settimeout(function,3000)
})

//create data //save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data =new userModel(req.body)
    await data.save()
    res.send({success: true, message:"data saved successfully",data : data})
}
)

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} =req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : _id},rest)
    res.send({success: true, message:"data updated successfully", data:data})
}
)

app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success: true, message:"data deleted successfully", data:data})
}
)


mongoose.connect("mongodb+srv://pavanudavant:Pavan8401@cluster0.0r4sc9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to DB")
    const PORT = process.env.PORT || 8000;
    app.listen(PORT,()=>console.log("server is running"))
}
)
.catch((err)=>console.log(err))


