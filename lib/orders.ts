import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
  email:{
    type:'String',
    required:true,
  },
  order_id:{
    type:'String',
    required:true,
  }
});

return