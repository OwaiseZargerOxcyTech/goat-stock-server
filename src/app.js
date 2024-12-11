const express = require("express");
const cors = require("cors");
const maleStockRoutes = require("./routes/maleStockRoutes");
const femaleStockRoutes = require("./routes/femaleStockRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://goat-stock-management.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin allowed
    } else {
      callback(new Error("Not allowed by CORS")); // Origin not allowed
    }
  },
  // Additional CORS configuration if needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

app.use("/api/male-stock", maleStockRoutes);
app.use("/api/female-stock", femaleStockRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/admin/login", loginRoutes);

module.exports = app;
