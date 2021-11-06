const { getAxiePrice } = require("./getAxiePrice");
const { getProfileAxiesListByID } = require("./getProfileAxiesList");

async function getTotalInvestmentByID(id) {
  const axies = await getProfileAxiesListByID(id);

  const allPrices = await Promise.all(axies.map((axie) => getAxiePrice(axie)));

  const total = allPrices.reduce((prev, cur) => prev + Number(cur), 0);

  return total;
}

module.exports = {
  getTotalInvestmentByID,
};
