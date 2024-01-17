import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenConfig } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pages = {
  tokenDirectory: (token: TokenConfig) => `/${token.slug}/directory`,
  settings: (token: TokenConfig) => `/${token.slug}/settings`,
};

export const networkName: Record<number, string> = {
  1: "Ethereum",
  5: "Ethereum Goerli",
  11155111: "Ethereum Sepolia",
  10: "Optimism",
  137: "Polygon",
  59144: "Linea",
};

export function truncateBytes(bytes: string = "0x", visibleChars: number = 4) {
  if (2 * visibleChars + 1 < bytes.length) {
    return (
      bytes?.slice(0, 2 + visibleChars) +
      "..." +
      bytes?.slice(bytes.length - visibleChars, bytes.length)
    );
  }

  return bytes;
}

const formatDate = (timestamp: any, omitTime?: boolean) => {
  let date = new Date(timestamp);

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = monthNames[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  let parsedMinutes = minutes < 10 ? "0" + String(minutes) : minutes;

  return (
    month +
    " " +
    day +
    ", " +
    year +
    (omitTime ? "" : " " + hours + ":" + parsedMinutes + " " + ampm)
  );
};

export default formatDate;

export const getNftUrl = (
  chainId?: number,
  contractAddress?: string,
  tokenId?: string
) => {
  const chainIdToOpenseaNetwork: Record<number, string> = {
    1: "ethereum",
    5: "goerli",
    10: "optimism",
    137: "matic",
    59144: "linea", // not actually on Opesea, uses Alienswap instead!
  };

  if (!chainId) return "";
  const networkName = chainIdToOpenseaNetwork[chainId];
  if (!networkName) return "";
  let baseUrl = `https://opensea.io/assets/${networkName}`;
  if (chainId === 5) {
    baseUrl = `https://testnets.opensea.io/assets/${networkName}`;
  } else if (chainId === 59144) {
    baseUrl = "https://alienswap.xyz/assets/linea";
  }

  return `${baseUrl}/${contractAddress}/${tokenId ? tokenId : ""}`;
};
