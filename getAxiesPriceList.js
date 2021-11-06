const axios = require("axios");

function getAxiesPriceList(filters = {}, from = 0, size = 1) {
  return axios
    .post("https://axieinfinity.com/graphql-server-v2/graphql", {
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
      query: GetAxieBriefListQuery,
    })
    .then(({ data }) => data.data.axies.results)
    .then((axies) => axies.map((axie) => axie.auction.currentPriceUSD))
    .catch((e) => console.log(e.response));
}

const GetAxieBriefListQuery = `query GetAxieBriefList(
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
      ...AxieBrief
    }
  }
}

fragment AxieBrief on Axie {
  auction {
    currentPriceUSD
  }
}
`;

module.exports = {
  getAxiesPriceList,
};
