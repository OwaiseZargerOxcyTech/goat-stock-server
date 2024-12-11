const prisma = require("../lib/prisma");

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await prisma.trade.findMany();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trades" });
  }
};

exports.createTrade = async (req, res) => {
  try {
    const newTrade = await prisma.trade.create({
      data: req.body,
    });
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(400).json({ error: "Error creating trade" });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrade = await prisma.trade.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedTrade);
  } catch (error) {
    res.status(400).json({ error: "Error updating trade" });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.trade.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Trade deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting trade" });
  }
};
