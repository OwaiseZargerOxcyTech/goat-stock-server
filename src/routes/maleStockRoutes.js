const express = require('express');
const router = express.Router();
const maleStockController = require('../controllers/maleStockController');

router.get('/', maleStockController.getAllMaleStock);
router.post('/', maleStockController.createMaleStock);
router.put('/:id', maleStockController.updateMaleStock);
router.delete('/:id', maleStockController.deleteMaleStock);

module.exports = router;