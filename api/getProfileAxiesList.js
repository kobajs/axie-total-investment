const axios = require("axios");
const { SHOW_API_ERROR } = require("../config");

async function getProfileAxiesListByID(id) {
  try {
    const queryResponse = await axios.post(
      "https://axieinfinity.com/graphql-server-v2/graphql",
      {
        query: GetAxieBriefListQuery,
        operationName: "GetAxieBriefList",
        variables: {
          from: 0,
          size: 24,
          auctionType: "All",
          owner: id,
        },
      }
    );

    const axies = queryResponse.data.data.axies.results;

    const mappedAxies = axies.map((axie) => {
      return {
        classes: [axie.class],
        parts: axie.parts
          .filter((p) => p.type !== "Eyes" && p.type !== "Ears")
          .map((p) => p.id),
        ...axie.stats,
      };
    });

    return mappedAxies;
  } catch (e) {
    if (SHOW_API_ERROR) {
      console.log(e?.response || e);
    }

    return [];
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
