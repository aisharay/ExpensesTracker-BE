const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aisharay1842_db_user:DzfNH1PHQpQM2ByL@userdata.c18l5bg.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
