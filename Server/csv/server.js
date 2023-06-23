const express = require("express");
const PORT = 4003;
const fs = require("fs");
const dotenv = require("dotenv");
const Database = require("./connect");
const Users = require("./Model/userSchema");
const { createObjectCsvWriter } = require("csv-writer");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
Database();

app.get("/download", async (req, res) => {
  try {
    let users = await Users.find();
    const csv = createObjectCsvWriter({
      path: "data.csv",
      header: Object.keys(users[0]),
    });
    csv.writeRecords(users).then(() => {
      console.log("csv created successfully");

      const data = fs.createReadStream("data.csv");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      data.pipe(res);
    });
  } catch (error) {
    console.error("An error occurred:", err);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => console.log(`get listening at port ${PORT}`));