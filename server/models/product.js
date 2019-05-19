mongoose = require('mongoose')
//port = 27017

const {Schema} = mongoose
const productSchmea = new Schema({
    name:String,
    quantity:Number,
    price:Number,
    description:String,
    image:String,
    category:String,
    seller:{ type: Schema.Types.ObjectId, ref: 'user'} //As an array?
})
const product = mongoose.model('product', productSchmea)
module.exports = product