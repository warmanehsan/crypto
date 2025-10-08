import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/crypto/cryptoSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.crypto);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">CryptoTracker</h1>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={handleChange}
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
    </header>
  );
}
