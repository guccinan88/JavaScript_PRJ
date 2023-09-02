const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
module.exports = {
  connect: () => {
    mongoose.connect(DB_HOST, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("open", () => console.log("DB Connection OK")).on("error", (err) =>
      console.log(err)
    );
  },
  close: () => {
    mongoose.connection.close();
  },
};
