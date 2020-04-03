const express = require('express')
const router = express.Router()

//import  category controller
const { createProduct, productById, read, remove, updateProduct, list, relatedList, listCategories, listBySearch, listSearch, getPhoto } = require('../controllers/product')
//import middleware to ensure category only accessed by admin
const { isAdmin, isAuth, requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')


router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, createProduct)
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, updateProduct)

router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/related/:productId', relatedList)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', getPhoto)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router 