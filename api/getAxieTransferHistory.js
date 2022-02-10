const { SHOW_API_ERROR } = require("../config");

async function getAxieTransferHistory(id) {
  try {
    const result = await axios
      .post("https://axieinfinity.com/graphql-server-v2/graphql", {
        query: GetAxieTransferHistoryQuery,
        operationName: "GetAxieTransferHistory",
        variables: {
          axieId: id,
          from: 0,
          size: 1,
        },
      })
      .then(({ data }) => data.data.axies.results);

    return result.data.data.axies.results;
  } catch (e) {
    if (SHOW_API_ERROR) {
      console.log(e.response);
    }

    return [];
  }
}

const GetAxieTransferHistoryQuery = `
  query GetAxieTransferHistory($axieId: ID!, $from: Int!, $size: Int!) {
    axie(axieId: $axieId) {
      id
      transferHistory(from: $from, size: $size) {
        ...TransferRecords
        __typename
      }
      ethereumTransferHistory(from: $from, size: $size) {
          ...TransferRecords
          __typename
      }
      __typename
    }
  }

  fragment TransferRecords on TransferRecords {
    total
    results {
      from
      to
      timestamp
      txHash
      withPrice
      __typename
    }
    __typename
  }
`;
