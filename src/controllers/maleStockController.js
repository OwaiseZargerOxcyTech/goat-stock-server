const prisma = require("../lib/prisma");
const fs = require("fs");
const { put, del } = require("@vercel/blob");
const parseForm = require("../utils/parseForm");

async function deleteBlogImage(blogImageUrl) {
  await del(blogImageUrl); // Ensure del function is implemented
}

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
    const { fields, files } = await parseForm(req);

    // Extract and handle fields
    const goatName = Array.isArray(fields.goatName)
      ? fields.goatName[0]
      : fields.goatName;
    const purchaserInformation = Array.isArray(fields.purchaserInformation)
      ? fields.purchaserInformation[0]
      : fields.purchaserInformation;
    const weight = Array.isArray(fields.weight)
      ? parseFloat(fields.weight[0])
      : parseFloat(fields.weight);
    const height = Array.isArray(fields.height)
      ? parseFloat(fields.height[0])
      : parseFloat(fields.height);
    const entryDate = Array.isArray(fields.entryDate)
      ? new Date(fields.entryDate[0])
      : new Date(fields.entryDate);
    const exitDate = Array.isArray(fields.exitDate)
      ? new Date(fields.exitDate[0])
      : new Date(fields.exitDate);
    const salesStatus = Array.isArray(fields.salesStatus)
      ? fields.salesStatus[0]
      : fields.salesStatus;
    const maintenanceRecords = Array.isArray(fields.maintenanceRecords)
      ? fields.maintenanceRecords[0]
      : fields.maintenanceRecords;
    const price = Array.isArray(fields.price)
      ? parseFloat(fields.price[0])
      : parseFloat(fields.price);
    const description = Array.isArray(fields.description)
      ? fields.description[0]
      : fields.description;
    const uniqueIdentificationNumber = Array.isArray(
      fields.uniqueIdentificationNumber
    )
      ? fields.uniqueIdentificationNumber[0]
      : fields.uniqueIdentificationNumber;

    // Extract and handle image file
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    let imageUrl = null;

    if (imageFile) {
      const filenameParts = imageFile.originalFilename.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      // Read the image file buffer
      const imageBuffer = fs.readFileSync(imageFile.filepath);

      // Upload the image to Vercel Blob storage
      const blob = await put(
        `${uniqueIdentificationNumber}.${fileExtension}`,
        imageBuffer,
        { access: "public" }
      );

      // Save the public URL of the image
      imageUrl = blob.url;
    }

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
        photographUrl: imageUrl,
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

    const { fields, files } = await parseForm(req);

    let updatedMaleStock;

    // Extract and handle fields
    const goatName = Array.isArray(fields.goatName)
      ? fields.goatName[0]
      : fields.goatName;
    console.log("goatName", goatName);
    const purchaserInformation = Array.isArray(fields.purchaserInformation)
      ? fields.purchaserInformation[0]
      : fields.purchaserInformation;
    const weight = Array.isArray(fields.weight)
      ? parseFloat(fields.weight[0])
      : parseFloat(fields.weight);
    const height = Array.isArray(fields.height)
      ? parseFloat(fields.height[0])
      : parseFloat(fields.height);
    const entryDate = Array.isArray(fields.entryDate)
      ? new Date(fields.entryDate[0])
      : new Date(fields.entryDate);
    const exitDate = Array.isArray(fields.exitDate)
      ? new Date(fields.exitDate[0])
      : new Date(fields.exitDate);
    const salesStatus = Array.isArray(fields.salesStatus)
      ? fields.salesStatus[0]
      : fields.salesStatus;
    const maintenanceRecords = Array.isArray(fields.maintenanceRecords)
      ? fields.maintenanceRecords[0]
      : fields.maintenanceRecords;
    const price = Array.isArray(fields.price)
      ? parseFloat(fields.price[0])
      : parseFloat(fields.price);
    const description = Array.isArray(fields.description)
      ? fields.description[0]
      : fields.description;
    const uniqueIdentificationNumber = Array.isArray(
      fields.uniqueIdentificationNumber
    )
      ? fields.uniqueIdentificationNumber[0]
      : fields.uniqueIdentificationNumber;

    // Extract and handle image file
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    let imageUrl = null;

    if (imageFile) {
      const maleStock2 = await prisma.maleStock.findFirst({
        where: { id: parseInt(id) },
      });

      await deleteBlogImage(maleStock2.photographUrl);

      console.log("imageFile", imageFile);
      const filenameParts = imageFile.originalFilename.split(".");
      const fileExtension = filenameParts[filenameParts.length - 1];

      // Read the image file buffer
      const imageBuffer = fs.readFileSync(imageFile.filepath);

      console.log("imageBuffer", imageBuffer);

      const time = Math.floor(Date.now() / 1000);

      // Upload the image to Vercel Blob storage
      const blob = await put(
        `${uniqueIdentificationNumber}_${time}.${fileExtension}`,
        imageBuffer,
        { access: "public" }
      );

      console.log("blob", blob);

      // Save the public URL of the image
      imageUrl = blob.url;

      updatedMaleStock = await prisma.maleStock.update({
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
          photographUrl: imageUrl,
        },
      });
    } else {
      updatedMaleStock = await prisma.maleStock.update({
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
    }
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

    const maleStock2 = await prisma.maleStock.findFirst({
      where: { id: parseInt(id) },
    });

    await deleteBlogImage(maleStock2.photographUrl);

    await prisma.maleStock.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Male stock deleted successfully" });
  } catch (error) {
    console.error("Error deleting male stock:", error);
    res.status(400).json({ error: "Error deleting male stock" });
  }
};
