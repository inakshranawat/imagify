import mongoose from 'mongoose'


const transactionSchema = new mongoose.Schema({
    userId : {type: String , required: true},
    credits: {type: Number},
    amount: {type: Number},
    plan: {type: String, required: true},
    payment: {type: Boolean , default: false },
    date: {type:Number}

})

const transactionModel = mongoose.model("transaction", transactionSchema)

export default transactionModel