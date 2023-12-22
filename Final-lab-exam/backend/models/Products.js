import mongoose from "mongoose";

const schema = mongoose.Schema(
   {
    ProductName:{
        type : String,
        required: true
    },
    Price:{
        type : String,
        required: true
    },
    description :{
        type : String,
        required : true
    },
    newArrival :{
        type : Boolean,
        required : true
    },
    men :{
        type : Boolean,
        required : true
    },
    women :{
        type : Boolean,
        required : true
    },
    fileName:{
        type:String,
        required:true
    }

   }
)
export const Product = mongoose.model("Product",schema)