import axios from "axios";

const BASE_URL =
  "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing";

export const fetchCryptos = async (start = 1, limit = 100) => {
  const response = await axios.get(BASE_URL, {
    params: {
      start,
      limit,
      sortBy: "rank",
      sortType: "asc",
      convert: "USD",
      cryptoType: "all",
      tagType: "all",
      audited: false,
    },
  });
  return response.data;
};
