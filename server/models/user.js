const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//port = 27017
const { Schema } = mongoose
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate:
            [{
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        user.findOne({ email: email})
                            .then(result => {
                                // console.log(_id, 'sini')
                                if (result) {
                                    resolve(false)
                                } else {
                                    resolve(true)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                },
                message: props => `${props.value} Email already taken`
            }, {
                validator: function validateEmail(email) {
                    var regex = /\S+@\S+\.\S+/;
                    return regex.test(email);
                },
                message: props => `this email: ${props.value} is not valid`
            }]
    },
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'product'}] //As an array?
})
userSchema.pre('save', function(next) {
    let user = this
    let salt = bcrypt.genSaltSync(8)
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    next();
});

const user = mongoose.model('user', userSchema)
module.exports = user