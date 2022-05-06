const express = require('express');
const productsRouter = require('./products/index');

const router = express.Router();

router.use('/products', productsRouter);

module.exports = router;