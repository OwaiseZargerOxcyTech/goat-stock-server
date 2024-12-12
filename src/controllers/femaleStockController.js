const prisma = require("../lib/prisma");
const fs = require("fs");
const { put, del } = require("@vercel/blob");
const parseForm = require("../utils/parseForm");

async function deleteBlogImage(blogImageUrl) {
  await del(blogImageUrl); // Ensure del function is implemented
}

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
    const mateDate = Array.isArray(fields.mateDate)
      ? fields.mateDate[0]
      : fields.mateDate;
    const pregnancyStatus = Array.isArray(fields.pregnancyStatus)
      ? fields.pregnancyStatus[0]
      : fields.pregnancyStatus;
    const matingPartnerInformation = Array.isArray(
      fields.matingPartnerInformation
    )
      ? fields.matingPartnerInformation[0]
      : fields.matingPartnerInformation;

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
        photographUrl: imageUrl,
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

    const { fields, files } = await parseForm(req);

    let updatedFemaleStock;

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
    const mateDate = Array.isArray(fields.mateDate)
      ? fields.mateDate[0]
      : fields.mateDate;
    const pregnancyStatus = Array.isArray(fields.pregnancyStatus)
      ? fields.pregnancyStatus[0]
      : fields.pregnancyStatus;
    const matingPartnerInformation = Array.isArray(
      fields.matingPartnerInformation
    )
      ? fields.matingPartnerInformation[0]
      : fields.matingPartnerInformation;

    // Extract and handle image file
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    let imageUrl = null;

    if (imageFile) {
      const femaleStock2 = await prisma.femaleStock.findFirst({
        where: { id: parseInt(id) },
      });

      await deleteBlogImage(femaleStock2.photographUrl);

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

      updatedFemaleStock = await prisma.femaleStock.update({
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
          mateDate: mateDate ? new Date(mateDate) : null,
          pregnancyStatus,
          matingPartnerInformation,
          photographUrl: imageUrl,
        },
      });
    } else {
      updatedFemaleStock = await prisma.femaleStock.update({
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
          mateDate: mateDate ? new Date(mateDate) : null,
          pregnancyStatus,
          matingPartnerInformation,
        },
      });
    }
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

    const femaleStock2 = await prisma.femaleStock.findFirst({
      where: { id: parseInt(id) },
    });

    await deleteBlogImage(femaleStock2.photographUrl);

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
