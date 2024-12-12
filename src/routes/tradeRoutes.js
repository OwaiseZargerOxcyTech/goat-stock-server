const express = require("express");
const router = express.Router();
const tradeStockController = require("../controllers/tradeController");

// Route to get all trade stocks
router.get("/", tradeStockController.getAllTradeStock);

// Route to create a new trade stock
router.post("/", tradeStockController.createTradeStock);

// Route to update an existing trade stock by ID
router.put("/:id", tradeStockController.updateTradeStock);

// Route to delete a trade stock by ID
router.delete("/:id", tradeStockController.deleteTradeStock);

module.exports = router;
