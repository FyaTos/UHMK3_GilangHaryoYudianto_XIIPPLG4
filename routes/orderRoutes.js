const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);                         
router.get('/nama/:namaRujak', orderController.getOrderByNamaRujak);   
router.post('/', orderController.createOrder);                        
router.put('/:id', orderController.updateOrder);                       
router.delete('/:id', orderController.deleteOrder);                    

module.exports = router;
