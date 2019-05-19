const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            req.decoded = decoded.payload
            next()
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        try{
            res.status(401).json({ message: 'unauthorized access' })
        }catch(err){
            res.status(500).json(err)
        }
    }
}