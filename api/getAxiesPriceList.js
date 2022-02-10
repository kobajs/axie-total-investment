const axios = require("axios");
const { SHOW_API_ERROR } = require("../config");

async function getAxiesPriceList(filters = {}, from = 0, size = 3) {
  try {
    const queryResponse = await axios.post(
      "https://axieinfinity.com/graphql-server-v2/graphql",
      {
        query: GetAxieBriefListQuery,
        operationName: "GetAxieBriefList",
        variables: {
          from: from,
          size: size,
          sort: "PriceAsc",
          auctionType: "Sale",
          owner: null,
          criteria: {
            // parts: ["back-garish-worm", "horn-parasite", "mouth-tiny-turtle"],
            // parts: filters.parts ?? null,
            // classes: filters.classes ?? null,
            pureness: null,
            region: null,
            bodyShapes: null,
            stages: null,
            numMystic: null,
            title: null,
            breedable: null,
            breedCount: null,
            hp: [],
            skill: [],
            speed: [],
            morale: [],
            ...filters,
          },
        },
      }
    );

    const axies = queryResponse.data.data.axies.results;
    const axiesPrice = axies.map((axie) =>
      Math.round(Number(axie.auction.currentPriceUSD))
    );

    if (axiesPrice.length > 0) {
      return axiesPrice;
    }

    return null;
  } catch (e) {
    if (SHOW_API_ERROR) {
      console.error(e?.response || e);
    }

    return null;
  }
}

const GetAxieBriefListQuery = `
  query GetAxieBriefList(
    $auctionType: AuctionType
    $criteria: AxieSearchCriteria
    $from: Int
    $sort: SortBy
    $size: Int
    $owner: String
  ) {
    axies(
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      sort: $sort
      size: $size
      owner: $owner
    ) {
      total
      results {
        auction {
          currentPriceUSD
        }
      }
    }
  }
`;

module.exports = {
  getAxiesPriceList,
};
