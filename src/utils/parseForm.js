const formidable = require("formidable")

// Function to wrap formidable in a promise
const parseForm = (req) => {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  };

  module.exports = parseForm;