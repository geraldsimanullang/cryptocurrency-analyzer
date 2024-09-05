import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Home() {
  const [coins, setCoins] = useState([]);

  async function fetchCoins() {
    try {
      const { data } = await axios.get("http://localhost:3000/coins", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setCoins(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-50">
      <Navbar />
      <div className="flex justify-center py-3">
        <h1>Please select a coin </h1>
      </div>
      <main className="flex flex-wrap gap-5 justify-center px-10 py-5">
        {coins.map((coin) => {
          return (
            <div key={coin.id}>
              <Link to={`/coins/${coin.GeckoId}`}>
                <Card coin={coin} />
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
}
