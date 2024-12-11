const prisma = require("../lib/prisma");

exports.getAllFemaleStock = async (req, res) => {
  try {
    const femaleStocks = await prisma.femaleStock.findMany();
    res.json(femaleStocks);
  } catch (error) {
    console.error("Error fetching female stock:", error);
    res.status(500).json({ error: "Error fetching female stock" });
  }
};

exports.createFemaleStock = async (req, res) => {
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
      mateDate,
      pregnancyStatus,
      matingPartnerInformation,
    } = req.body;

    const newFemaleStock = await prisma.femaleStock.create({
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
        mateDate: mateDate ? new Date(mateDate) : null,
        pregnancyStatus,
        matingPartnerInformation,
      },
    });
    res.status(201).json(newFemaleStock);
  } catch (error) {
    console.error("Error creating female stock:", error);
    res
      .status(400)
      .json({ error: "Error creating female stock", message: error.message });
  }
};

exports.updateFemaleStock = async (req, res) => {
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

    const updatedFemaleStock = await prisma.femaleStock.update({
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
    res.json(updatedFemaleStock);
  } catch (error) {
    console.error("Error updating female stock:", error);
    res
      .status(400)
      .json({ error: "Error updating female stock", message: error.message });
  }
};

exports.deleteFemaleStock = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.femaleStock.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Female stock deleted successfully" });
  } catch (error) {
    console.error("Error deleting female stock:", error);
    res
      .status(400)
      .json({ error: "Error deleting female stock", message: error.message });
  }
};
