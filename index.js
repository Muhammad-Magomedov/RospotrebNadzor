const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { URL, PORT } = require("./src/config/config");
const router = require("./src/routes/index.route");
const fileUpload = require("express-fileupload")
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload())
app.use(cors());
app.use(morgan("tiny"));
app.use(router);
app.use("/public/uploads/img",express.static(path.resolve(__dirname, "/public/uploads/img")))

const start = async () => {
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log("Сервер запущен на порте ", PORT);
    });
  } catch (e) {
    console.log("Ошибка подключения ", e.message);
  }
};

start();
