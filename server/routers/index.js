const router = require('express').Router()

const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const userController = require('../controller/userController')
const authentication = require('../middleware/authentication')
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
// router.use('/user',userRouter)

router.use(authentication)
router.patch('/user/cart', userController.emptyCart)
router.patch('/user/cart/add/:productId', userController.productToCart)
router.patch('/user/cart/remove/:productId', userController.removeProductFromCart)
router.get('/user/cart', userController.cart)
router.use('/product',productRouter)

module.exports = router