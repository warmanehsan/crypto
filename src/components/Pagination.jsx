import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/crypto/cryptoSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const {
    items = [],
    currentPage,
    pageSize,
    filteredItems,
  } = useSelector((state) => state.crypto);

  const itemsOrFiltred = filteredItems.length === 0 ? items : filteredItems;

  const totalPages =
    itemsOrFiltred.length <= 10
      ? 1
      : Math.ceil((items.length - 10) / pageSize) + 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };
  return (
    <div className="flex justify-center mt-4 space-x-2 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
