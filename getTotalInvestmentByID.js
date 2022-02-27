const { getAxiesPriceList } = require("./api/getAxiesPriceList");
const { getProfileByRoninAddress } = require("./api/getProfile");
const { getProfileAxiesListByID } = require("./api/getProfileAxiesList");
const { retry } = require("./api/retry");
const { consoleAccount } = require("./createReport");

const MAX_AXIE_PRICE_THRESHOLD = 200;
const AXIE_PRICE_AVERAGE = 50;

async function getAxiePrice(axie) {
  const result = await retry(
    () => getAxiesPriceList(axie),
    (result) => result
  );

  if (result?.length > 0) {
    const axiePrice = Math.round(
      result?.reduce((prev, cur) => prev + cur / result.length, 0)
    );

    if (axiePrice > MAX_AXIE_PRICE_THRESHOLD) {
      return AXIE_PRICE_AVERAGE;
    } else {
      return axiePrice;
    }
  }

  return AXIE_PRICE_AVERAGE;
}

async function getTotalInvestmentByID(id) {
  const userAccount = await getProfileByRoninAddress(id);
  const userAxies = await retry(
    () => getProfileAxiesListByID(id),
    (res) => res.length > 0
  );
  const axiesPrice = await Promise.all(
    userAxies.map((userAxie) => getAxiePrice(userAxie))
  );

  const total = axiesPrice.reduce((prev, cur) => prev + Number(cur), 0);

  const rowInfo = {
    name: userAccount.name,
    id,
    axiesPrice,
    total,
  };

  consoleAccount(rowInfo);

  return rowInfo;
}

module.exports = {
  getTotalInvestmentByID,
};
