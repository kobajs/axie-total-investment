const { getAxiesPriceList } = require("./api/getAxiesPriceList");
const { getProfileByRoninAddress } = require("./api/getProfile");
const { getProfileAxiesListByID } = require("./api/getProfileAxiesList");
const { retry } = require("./api/retry");
const { consoleAccount } = require("./createReport");

async function getAxiePrice(axie) {
  const result = await retry(
    () => getAxiesPriceList(axie),
    (result) => result
  );

  if (result?.length > 0) {
    return Math.round(
      result?.reduce((prev, cur) => prev + cur / result.length, 0)
    );
  }

  return 0;
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
