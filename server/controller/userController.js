const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

class UserController {
    static signup(req, res) {
        let { name, email, password } = req.body
        user
            .create({
                name,
                email,
                password
            })
            .then(createdUser => {
                res.status(200).json(createdUser)
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }
    static signin(req, res) {
        let { email, password } = req.body
        user
            .findOne({ email })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let payload = user
                        var token = jwt.sign({ payload }, process.env.SECRET);
                        res.status(200).json({ data: user, token: token })
                    } else {
                        res.status(400).json({ error: 'email or password is wrong' })
                    }
                } else {
                    res.status(400).json({ error: 'email or password is wrong' })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    }
    static cart(req,res){
        let id = req.decoded._id
        user
            .findById(id)
            .populate('cart')
            .then( user => {
                res.status(200).json( user.cart)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
    static productToCart(req,res){
        let id = req.decoded._id
        let productId = req.params.productId
        user
            .findOneAndUpdate({_id:id},
                {$push:
                    {cart: productId}
                },
                {new:true}
            )
            .populate('cart')
            .then( updated => {
                res.status(200).json( updated )
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
    static removeProductFromCart(req,res){
        let id = req.decoded._id
        let productId = req.params.productId
        user
            .findOneAndUpdate({_id:id},
                {$pull:
                    {cart: productId}
                },
                {new:true}
            )
            .populate('cart')
            .then( updated =>{
                res.status(200).json(updated)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static emptyCart(req,res){
        let id = req.decoded._id
        user
            .findOneAndUpdate(
                {
                    _id:id
                },{
                    cart:[]
                },{
                    new:true
                }
            )
            .then(updated=>{
                res.status(200).json(updated)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
            
    }
}
module.exports = UserController