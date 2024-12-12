const prisma = require("../lib/prisma");

exports.getAllTradeStock = async (req, res) => {
  try {
    const tradeStocks = await prisma.tradeStock.findMany();
    res.json(tradeStocks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trade stock" });
  }
};

exports.createTradeStock = async (req, res) => {
  try {
    const {
      goatName,
      purchaserInformation,
      customerDetails,
      weight,
      height,
      entryDate,
      exitDate,
      salesStatus,
      maintenanceRecords,
      price,
      description,
      uniqueIdentificationNumber,
    } = req.body;

    const newTradeStock = await prisma.tradeStock.create({
      data: {
        goatName,
        purchaserInformation,
        customerDetails,
        weight,
        height,
        entryDate: entryDate ? new Date(entryDate) : null, // Convert to Date object
        exitDate: exitDate ? new Date(exitDate) : null, // Convert to Date object
        salesStatus,
        maintenanceRecords,
        price,
        description,
        uniqueIdentificationNumber,
      },
    });
    res.status(201).json(newTradeStock);
  } catch (error) {
    console.error("Error creating trade stock:", error);
    res
      .status(400)
      .json({ error: "Error creating trade stock", message: error.message });
  }
};

exports.updateTradeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      goatName,
      purchaserInformation,
      customerDetails,
      weight,
      height,
      entryDate,
      exitDate,
      salesStatus,
      maintenanceRecords,
      price,
      description,
      uniqueIdentificationNumber,
    } = req.body;

    const updatedTradeStock = await prisma.tradeStock.update({
      where: { id: parseInt(id) },
      data: {
        goatName,
        purchaserInformation,
        customerDetails,
        weight,
        height,
        entryDate: entryDate ? new Date(entryDate) : null, // Convert to Date object
        exitDate: exitDate ? new Date(exitDate) : null, // Convert to Date object
        salesStatus,
        maintenanceRecords,
        price,
        description,
        uniqueIdentificationNumber,
      },
    });
    res.json(updatedTradeStock);
  } catch (error) {
    console.error("Error updating trade stock:", error);
    res
      .status(400)
      .json({ error: "Error updating trade stock", message: error.message });
  }
};

exports.deleteTradeStock = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tradeStock.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Trade stock deleted successfully" });
  } catch (error) {
    console.error("Error deleting trade stock:", error);
    res.status(400).json({ error: "Error deleting trade stock" });
  }
};
