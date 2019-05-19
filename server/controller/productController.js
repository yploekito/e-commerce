const product = require('../models/product')

class productController {
    static getProducts(req, res) {
        product
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getSpecificProduct(req, res) {
        let id = req.params.id
        product
            .findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static create(req, res) {
        let image = null
        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let { name, stock, description, price, category } = req.body
        let id = req.decoded._id
        product
            .create({
                name,
                stock,
                price,
                description,
                image,
                category,
                seller: id
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static delete(req, res) {
        let id = req.params.id
        product
            .findOneAndDelete({ _id: id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static update(req, res) {
        let id = req.params.id
        product
            .findById(id)
            .then(product => {
                product.set(req.body)
                return product.save()
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}
module.exports = productController