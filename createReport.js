const { stringify } = require("csv/sync");
const fs = require("fs");
const { now } = require("./date");

function consoleAccount(account) {
  console.log(`----- ${account.name} -----`);
  console.log({
    id: account.id,
    axiesPrice: account.axiesPrice,
    total: account.total,
  });
}

function createRow({ id, name, axiesPrice, total }) {
  const row = {};
  row.id = id || "";
  row.name = name || "";
  row.axiesPrice = axiesPrice || "";
  row.total = total || 0;

  return row;
}

function createAccountsReport(accounts) {
  const resultRow = {
    total: accounts.reduce((prev, cur) => prev + cur.total, 0),
  };

  const rows = accounts.map(createRow);
  rows.push(createRow(resultRow));

  const output = stringify(rows, {
    header: true,
  });

  console.log(output);

  fs.mkdirSync("reports", { recursive: true });
  fs.writeFileSync(`reports/report_${now()}.csv`, output);
}

module.exports = {
  consoleAccount,
  createAccountsReport,
};
