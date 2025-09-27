import { TokenOption } from "@/types/createPool";
import { EmojiCoinToken } from "@/types/emojiCoin";
import {
  AccountAddress,
  Aptos,
  AptosConfig,
  GetAccountCoinsDataResponse,
  Network,
} from "@aptos-labs/ts-sdk";

export const aptosClient = new Aptos(
  new AptosConfig({
    network: Network.MAINNET,
  })
);

export const aptosTestnetClient = new Aptos(
  new AptosConfig({
    network: Network.TESTNET,
    clientConfig: {
      API_KEY: 'AG-9CXPI3ANUQAVTPHNTZKN8EY9HHM9GMCVB'
    }
  })
);

export const getUserCoins = async (
  accountAddress: AccountAddress,
  limitPerPage: number = 100
) => {
  try {
    if (!accountAddress) return [];
    const res = await aptosClient.getAccountCoinsCount({ accountAddress });
    const batch = Math.ceil(res / limitPerPage);
    const coins: GetAccountCoinsDataResponse = [];
    for (let index = 0; index < batch; index++) {
      const data = await aptosClient.getAccountCoinsData({
        accountAddress,
        options: {},
      });
      coins.push(...data);
    }
    return coins;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getUserTestnetCoins = async (
  accountAddress: AccountAddress,
  limitPerPage: number = 100
) => {
  try {
    if (!accountAddress) return [];
    const res = await aptosTestnetClient.getAccountCoinsCount({ accountAddress });
    const batch = Math.ceil(res / limitPerPage);
    const coins: GetAccountCoinsDataResponse = [];
    for (let index = 0; index < batch; index++) {
      const data = await aptosTestnetClient.getAccountCoinsData({
        accountAddress,
        options: {},
      });
      coins.push(...data);
    }
    return coins;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getTop30Coins = async (
  accountAddress: AccountAddress
): Promise<EmojiCoinToken[]> => {
  try {
    const response = await fetch(
      "https://api.panora.exchange/tokenlist?panoraUI=true,false&panoraTags=emojicoin",
      {
        headers: {
          "x-api-key":
            "a4^KV_EaTf4MW#ZdvgGKX#HUD^3IFEAOV_kzpIE^3BQGA8pDnrkT7JcIy#HNlLGi",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch emojicoin.fun data");
    }

    const { data } = await response.json();
    const userCoins = await getUserCoins(accountAddress);

    const top30 = data
      .sort((a, b) => b.usdPrice - a.usdPrice)
      .slice(0, 30)
      .filter((t) => t.name != "🦁❤️" || t.symbol != "🦁❤️");

    const transformedData = transformTokenData(top30);
    for (let i = 0; i < transformedData.length; i++) {
      for (let j = 0; j < userCoins.length; j++) {
        if (transformedData[i].id == userCoins[j].asset_type) {
          transformedData[i].balance = `${
            userCoins[j].amount / 10 ** userCoins[j].metadata.decimals
          }`;
        }
      }
    }

    return transformedData;
    // return transformedData.map(t => transformEmojiCoinToTokenOption(t));
  } catch (err) {
    console.log(err);
    return [];
  }
};

const transformEmojiCoinToTokenOption = (
  emojiToken: EmojiCoinToken
): TokenOption => ({
  id: emojiToken.id,
  name: emojiToken.name,
  emoji: emojiToken.emoji,
  symbol: emojiToken.symbol,
  balance: emojiToken.balance || "0",
});

function transformTokenData(apiData): EmojiCoinToken[] {
  if (!apiData) {
    return [];
  }

  return apiData.map((token) => ({
    id: token.tokenAddress || token.faAddress,
    name: token.name,
    emoji: token.emoji,
    symbol: token.symbol,
    marketCap: token.usdPrice * 5_000_000,
    price: token.usdPrice || 0,
    volume24h: token.volume_24h || token.volume24h || 0,
    priceChange24h: token.price_change_24h || token.priceChange24h || 0,
    address: token.tokenAddress || token.faAddress,
    balance: token.balance || "1",
  }));
}

export const testnetContracts = {
  aptos: '0x1::aptos_coin::AptosCoin',
  staking: '0xb8f97c225f9629d68ff0d16ac743deadfabfbefa98ce1e05cc819252543b7d72::emoji_staking',
  lion: '0x267699fea47b7928e50a26b64e50fb76eb4b61ff23b9938f116a4115778143ba::tokens::HairToken',
  rocket: '0x267699fea47b7928e50a26b64e50fb76eb4b61ff23b9938f116a4115778143ba::tokens::JGem'
}