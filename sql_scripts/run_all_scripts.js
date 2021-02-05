const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

async function exec_file(fileName, client) {
  const sql = fs.readFileSync(path.resolve(__dirname, fileName), "UTF-8");
  await client.query(sql);
}
async function run_all_sql_scripts() {
  const client = new Client(
    process.env.DATABASE_URL
  );
  await client.connect();
  await exec_file('init.sql', client)
  await client.end().catch((err) => console.log(err));
}
module.exports = run_all_sql_scripts;
