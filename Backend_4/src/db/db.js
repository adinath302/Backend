const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect(
    "mongodb+srv://yt:TlGiTp12C8knmDpD@cluster0.hsy8epu.mongodb.net/project-1",
  );
  console.log("connected to DB");
}

module.exports = connectDb;
