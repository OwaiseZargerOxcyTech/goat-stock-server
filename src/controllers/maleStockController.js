const prisma = require("../lib/prisma");

exports.getAllMaleStock = async (req, res) => {
  try {
    const maleStocks = await prisma.maleStock.findMany();
    res.json(maleStocks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching male stock" });
  }
};

exports.createMaleStock = async (req, res) => {
  try {
    const {
      goatName,
      purchaserInformation,
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

    const newMaleStock = await prisma.maleStock.create({
      data: {
        goatName,
        purchaserInformation,
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
    res.status(201).json(newMaleStock);
  } catch (error) {
    console.error("Error creating male stock:", error);
    res
      .status(400)
      .json({ error: "Error creating male stock", message: error.message });
  }
};

exports.updateMaleStock = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      goatName,
      purchaserInformation,
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

    const updatedMaleStock = await prisma.maleStock.update({
      where: { id: parseInt(id) },
      data: {
        goatName,
        purchaserInformation,
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
    res.json(updatedMaleStock);
  } catch (error) {
    console.error("Error updating male stock:", error);
    res
      .status(400)
      .json({ error: "Error updating male stock", message: error.message });
  }
};

exports.deleteMaleStock = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.maleStock.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Male stock deleted successfully" });
  } catch (error) {
    console.error("Error deleting male stock:", error);
    res.status(400).json({ error: "Error deleting male stock" });
  }
};
