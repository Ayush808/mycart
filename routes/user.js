const express = require('express')
const router = express.Router()

const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth')
const { userById, readUser, updateUser, purchaseHistory } = require('../controllers/user')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/user/:userId', requireSignIn, isAuth, readUser)
router.put('/user/:userId', requireSignIn, isAuth, updateUser)
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory)

router.param("userId", userById)

module.exports = router