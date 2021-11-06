const axios = require("axios");

function getProfileAxiesListByID(id) {
  return axios
    .post("https://axieinfinity.com/graphql-server-v2/graphql", {
      operationName: "GetAxieBriefList",
      variables: {
        from: 0,
        size: 24,
        auctionType: "All",
        owner: id,
      },
      query: GetAxieBriefListQuery,
    })
    .then(({ data }) => data.data.axies.results)
    .then((axies) =>
      axies.map((axie) => ({
        classes: [axie.class],
        parts: axie.parts
          .filter((p) => p.type !== "Eyes" && p.type !== "Ears")
          .map((p) => p.id),
        ...axie.stats,
      }))
    )
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
      __typename
    }
    __typename
  }
}

fragment AxieBrief on Axie {
  id
  name
  stage
  class
  breedCount
  image
  title
  battleInfo {
    banned
    __typename
  }
  auction {
    currentPrice
    currentPriceUSD
    __typename
  }
  parts {
    id
    name
    class
    type
    specialGenes
    __typename
  }
  stats {
    hp
    speed
    morale
    skill
  }
  __typename
}
`;

module.exports = {
  getProfileAxiesListByID,
};
