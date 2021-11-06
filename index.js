const { getTotalInvestmentByID } = require("./getTotalInvestmentByID");

async function start() {
  const allAccountsValue = await Promise.all(
    [
      "0x460f3a4a9edde5779213c573c0032827b40e9538",
      "0x41e94293ae051fe7538c8771cd74d059376c55db",
    ].map((id) => getTotalInvestmentByID(id))
  );

  const totalInvestment = allAccountsValue.reduce((prev, cur) => prev + cur, 0);
  console.log(totalInvestment);

  return totalInvestment;
}

start();
