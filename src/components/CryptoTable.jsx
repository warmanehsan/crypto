import { useSelector } from "react-redux";
import { formatNumber } from "../utils/formatNumber";
import { Sparkline } from "./Sparkline";
import Pagination from "./Pagination";

const CryptoTable = () => {
  const {
    items = [],
    currentPage,
    pageSize,
    lastSync,
    searchQuery,
    filteredItems,
  } = useSelector((state) => state.crypto);

  const startIndex = currentPage === 1 ? 0 : 10 + (currentPage - 2) * pageSize;
  const endIndex = currentPage === 1 ? 10 : startIndex + pageSize;

  const itemsOrFiltred = filteredItems.length === 0 ? items : filteredItems;

  const currentData = itemsOrFiltred.slice(startIndex, endIndex);

  if (filteredItems.length == 0 && searchQuery !== "")
    return <h1>No results found</h1>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Cryptocurrency List</h2>
        {lastSync && (
          <span className="text-xs text-gray-500">
            آخرین بروزرسانی: {new Date(lastSync).toLocaleTimeString("fa-IR")}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price (USD)</th>
              <th className="px-4 py-2 text-left">24h %</th>
              <th className="px-4 py-2 text-left">Market Cap</th>
              <th className="px-4 py-2 text-left">Volume (24h)</th>
              <th className="px-4 py-2 text-left">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((coin) => {
              const usd = coin.quotes?.[0];
              const usdQuote = coin.quotes.find((q) => q.name === "USD");
              const last7Days = usdQuote?.percentChange7d
                ? [
                    0,
                    usdQuote.percentChange7d,
                    usdQuote.percentChange7d / 2,
                    usdQuote.percentChange7d,
                  ]
                : [];

              return (
                <tr key={coin.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{coin.cmcRank}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <img
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium text-gray-900">
                      {coin.name}
                    </span>
                    <span className="text-gray-500 text-xs uppercase">
                      {coin.symbol}
                    </span>
                  </td>
                  <td className="px-4 py-2 ">
                    $
                    {usd?.price?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td
                    className={`px-4 py-2  ${
                      usd?.percentChange24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usd?.percentChange24h?.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 ">
                    ${formatNumber(usd?.marketCap)}
                  </td>
                  <td className="px-4 py-2 ">
                    ${formatNumber(usd?.volume24h)}
                  </td>
                  <td className="px-4 py-2 ">
                    <Sparkline data={last7Days} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default CryptoTable;
