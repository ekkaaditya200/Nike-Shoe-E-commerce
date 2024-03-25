import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
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

const Item = mongoose.model("Item",itemSchema);

export default Item;