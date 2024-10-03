const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const authController = require('../controllers/authController');

// router.get('/login', authController.getLogin);
// router.post('/login', authController.postLogin);
// router.get('/signup', authController.getSignup);
// router.post('/signup', authController.postSignup);


router.get('/products', adminController.getProducts);
router.get('/products/add', adminController.getAddProduct);
router.post('/products/add', adminController.postAddProduct);
router.get('/products/edit/:id', adminController.getEditProduct);
router.post('/products/edit/:id', adminController.postEditProduct);
router.post('/products/delete/:id', adminController.deleteProduct);

module.exports = router;