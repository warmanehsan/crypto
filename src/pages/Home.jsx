// src/pages/Home.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFromCache, syncWithAPI } from "../redux/crypto/cryptoThunks";
import CryptoTable from "../components/CryptoTable";
import Header from "./Header";

export default function Home() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(loadFromCache())
      .unwrap()
      .then((data) => {
        if (!data || data.length === 0) {
          console.log("📡 IndexedDB empty, fetching from API...");
          dispatch(syncWithAPI());
        }
      })
      .catch(() => {
        console.log("📡 IndexedDB empty or error, fetching from API...");
        dispatch(syncWithAPI());
      });

    const interval = setInterval(() => {
      dispatch(syncWithAPI());
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading data 😕</p>}
        {status === "succeeded" && <CryptoTable />}
      </main>
    </div>
  );
}
