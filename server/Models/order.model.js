import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userRef:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    shadow:{
        type:String,
        required:true
    },
    cartQuantity:{
        type:Number,
        required:true
    }
})

const Order = mongoose.model("Order",orderSchema);

export default Order;