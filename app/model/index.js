const sequelize = require("../config/db");
const Teacher = require("./teacher");
const Computer = require("./computer");


// Sync all models
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Error syncing DB:", err));

module.exports = { Teacher,Computer};
