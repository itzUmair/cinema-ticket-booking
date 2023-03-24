const db = require("../config/database");

const home = async (req, res) => {
  const [result] = await db.query(`SHOW TABLES;`);
  res.json({ message: "working", data: result });
};

module.exports = { home };
