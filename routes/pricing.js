const express=require('express')
const router=express.Router();


const pricingController = require('../controllers/pricingController');

router.post('/calculate', pricingController.calculatePrice);
router.post('/create', pricingController.createPricing);
router.put('/update/:id', pricingController.updatePrice);
router.delete('/delete/:id', pricingController.deleteprice)
module.exports =router