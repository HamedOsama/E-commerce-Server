const express = require('express')

const userRoutes = require('./user');
const productRoutes = require('./product');
const contactUsRoutes = require('./contactUs');

const router = express.Router()

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/contact', contactUsRoutes)

module.exports = router;