const express = require('express');
const router = express.Router();
const rujakController = require('../controllers/rujakController');
 
router.get('/', rujakController.getAllRujak);           
router.get('/:id', rujakController.getRujakById);       
router.post('/', rujakController.createRujak);        
router.put('/:id', rujakController.updateRujak);       
router.delete('/:id', rujakController.deleteRujak);    

module.exports = router;
