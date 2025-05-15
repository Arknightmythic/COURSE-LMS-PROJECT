import mongoose from "mongoose";


const transactionModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price:{
        type: Number,
        requeired:true
    },
    status:{
        type:String,
        enum:['pending', 'success','failed'],
        default: 'pending',
    }
},
{
    timestamps:true
})


export default mongoose.model('Transaction', transactionModel)