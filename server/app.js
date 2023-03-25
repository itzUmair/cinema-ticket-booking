const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use("/api/v1", routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening to port: ${port}...`));
