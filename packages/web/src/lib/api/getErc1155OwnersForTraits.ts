import { gql, request } from "graphql-request";
import { checksumAddress } from "viem";
import { Erc1155Owner } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc1155OwnersForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddress: String!
  ) {
    erc1155Owners(
      where: {
        chainId: $chainId
        contractAddress_in: $contractAddresses
        ownerAddress: $ownerAddress
      }
    ) {
      items {
        id
        chainId
        contractAddress
        ownerAddress
        tokenId
        balance
      }
    }
  }
`;

export const getErc1155OwnersForTraits = async (
  chainId: number,
  contractAddresses: `0x${string}`[],
  ownerAddress: `0x${string}`
) => {
  if (contractAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksumed = contractAddresses.map((v) => {
    return v.toLowerCase();
  });
  const ownerAddressChecksumed = ownerAddress.toLowerCase();

  const variables = {
    chainId,
    contractAddresses: contractAddressesChecksumed,
    ownerAddress: ownerAddressChecksumed,
  };
  const data = (await request(URL, query, variables)) as {
    erc1155Owners: { items: any[] };
  };
  return (data?.erc1155Owners?.items ?? []) as Erc1155Owner[];
};
