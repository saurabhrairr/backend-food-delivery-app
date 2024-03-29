// orgnizations Schema Filed
const mongoose = require('mongoose')

const organizationSchema =new mongoose.Schema({

       name:{

              type:String,
              required:true,
       }
})

const organization=mongoose.model("Organization",organizationSchema)
module.exports=organization