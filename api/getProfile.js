const axios = require("axios");
const { SHOW_API_ERROR } = require("../config");

async function getProfileByRoninAddress(id) {
  try {
    const queryResponse = await axios.post(
      "https://axieinfinity.com/graphql-server-v2/graphql",
      {
        query: GetProfileByRoninAddressQuery,
        operationName: "GetProfileByRoninAddress",
        variables: {
          roninAddress: id,
        },
      }
    );

    const profile = queryResponse.data.data.publicProfileWithRoninAddress;

    return profile;
  } catch (e) {
    if (SHOW_API_ERROR) {
      console.log(e?.response || e);
    }

    return {
      name: "",
    };
  }
}

const GetProfileByRoninAddressQuery = `
  query GetProfileByRoninAddress($roninAddress: String!) {
    publicProfileWithRoninAddress(roninAddress: $roninAddress) {
      name
    }
  }
`;

module.exports = {
  getProfileByRoninAddress,
};
