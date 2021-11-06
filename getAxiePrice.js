const { getAxiesPriceList } = require("./getAxiesPriceList");

async function getAxiePrice(axie) {
  const axiesPricesInUSD = await getAxiesPriceList(axie);

  return axiesPricesInUSD[0] || "";
}

module.exports = { getAxiePrice };
