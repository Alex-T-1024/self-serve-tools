require("dotenv").config();
const MySql = require("sync-mysql");
const fs = require("fs");

const connection = new MySql({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
});

try {
  const data = fs.readFileSync("./input.txt", "utf8");
  const lines = data.split("\n");
  for (let line of lines) {
    if (line.trim() === "") continue;
    let data = line.split(" ");
    let table = data[0];
    let cols = data.splice(1);
    cols = cols.filter((col) => col != "");
    console.log("Processing Table: ", table);
    console.log("Cols:", cols);

    for (let col of cols) {
      const result = connection.query(`SELECT ${col} FROM ${table}`);
      for(let writeLine of result) {
        fs.appendFileSync("./output", writeLine[col]+'\n');
      }
    }
  }
} catch (err) {
  console.error(err);
}
