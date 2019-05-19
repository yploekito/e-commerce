const router = require('express').Router()
const imageMiddleware = require('../middleware/image')
const {
    upload, sendUploadToGCS
} = imageMiddleware

//pindah ke controller 
const productController = require('../controller/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getSpecificProduct )
router.post('/',upload.single('image'),sendUploadToGCS, productController.create)
router.delete('/:id', productController.delete)
router.patch('/:id', productController.update)

module.exports = router
