const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const home = async (req, res) => {
  const [result] = await db.query(`SHOW TABLES;`);
  res.json({ message: "working", data: result });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // checking for valid email address
  if (
    !email ||
    !email.length ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    res.status(400).json({ message: "invalid email address" });
    return;
  }

  // checking for valid password
  if (
    !password ||
    !password.length ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    res.status(400).json({ message: "invalid password" });
    return;
  }

  // verifying admin
  const [result] = await db.query(
    `
      SELECT *
      FROM admin
      WHERE admin.email = ?;
    `,
    [email]
  );

  // if the result query is empty
  if (!result.length > 0) {
    res.status(404).json({ message: "no user found" });
    return;
  }

  // validating the password with hashed password in the database
  const valid = await bcrypt.compare(password, result[0].password);
  if (!valid) {
    res.status(404).json({ message: "no user found" });
    return;
  }
  const admin_id = result[0].admin_id;

  const accessToken = jwt.sign({ admin_id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  // sending the access token
  res
    .status(200)
    .json({ data: [result[0].username, result[0].email], token: accessToken });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // checking for valid email address
  if (
    !email ||
    !email.length ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    res.status(400).json({ message: "invalid email address" });
    return;
  }

  // checking for valid password
  if (
    !password ||
    !password.length ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    res.status(400).json({ message: "invalid password" });
    return;
  }

  // verifying admin
  const [result] = await db.query(
    `
      SELECT *
      FROM customer
      WHERE customer.email = ?;
    `,
    [email]
  );

  // if the result query is empty
  if (!result.length > 0) {
    res.status(404).json({ message: "no user found" });
    return;
  }

  // validating the password with hashed password in the database
  const valid = await bcrypt.compare(password, result[0].password);
  if (!valid) {
    res.status(404).json({ message: "no user found" });
    return;
  }
  const customer_id = result[0].customer_id;

  const accessToken = jwt.sign({ customer_id }, process.env.JWT_SECRET, {
    expiresIn: "5s",
  });

  // sending the access token
  res
    .status(200)
    .json({ data: [result[0].username, result[0].email], token: accessToken });
};

// user sign up
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const [test] = await db.query(
    `
      SELECT * FROM customer WHERE customer.email = ?
    `,
    [email]
  );

  if (test.length > 0) {
    res.status(400).json({ message: "Account with this email already exists" });
    return;
  }

  const customer_id = Math.floor(Math.random() * 100000);

  try {
    const [result] = await db.query(
      `
          INSERT INTO customer
          VALUES(?, ?, ?, ?)
        `,
      [customer_id, name, hashedPassword, email]
    );
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(500)
        .json({ message: "Something went wrong! Please try again" });
      return;
    }
    res.status(500).json({ message: err.code });
    return;
  }

  res.status(201).json({ message: "Account created successfully!" });
};

const verifyToken = async (req, res) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(400).json({ message: "wrong token" });
    return;
  }
  try {
    const valid = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ accessToken: token });
    return;
  } catch (err) {
    res.status(401).json({ message: err.name });
    return;
  }
};

module.exports = { home, adminLogin, userLogin, userSignup, verifyToken };
