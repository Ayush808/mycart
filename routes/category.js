const express = require('express')
const router = express.Router()

//import  category controller
const { createCategory, categoryById, read, updateCategory, deleteCategory, list } = require('../controllers/category')
//import middleware to ensure category only accessed by admin
const { isAdmin, isAuth, requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')

//check required validation for name of category
const { createCategoryValidator } = require('../validator')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, createCategoryValidator, createCategory)
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, deleteCategory)
router.get('/categories', list)

router.param("userId", userById)
router.param("categoryId", categoryById)

module.exports = router 