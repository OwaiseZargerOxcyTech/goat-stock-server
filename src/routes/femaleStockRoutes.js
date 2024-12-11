const express = require("express");
const router = express.Router();
const femaleStockController = require("../controllers/femaleStockController");

router.get("/", femaleStockController.getAllFemaleStock);
router.post("/", femaleStockController.createFemaleStock);
router.put("/:id", femaleStockController.updateFemaleStock);
router.delete("/:id", femaleStockController.deleteFemaleStock);

module.exports = router;
