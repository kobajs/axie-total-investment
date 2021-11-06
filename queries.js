const GetProfileByRoninAddressQuery = `query GetProfileByRoninAddress($roninAddress: String!) {
    publicProfileWithRoninAddress(roninAddress: $roninAddress) {
      ...Profile
      __typename
    }
  }

  fragment Profile on PublicProfile {
    accountId
    name
    addresses {
      ...Addresses
      __typename
    }
    __typename
  }

  fragment Addresses on NetAddresses {
    ethereum
    tomo
    loom
    ronin
    __typename
  }
`;

module.exports = {
  GetAxieBriefListQuery,
  GetProfileByRoninAddressQuery,
};
