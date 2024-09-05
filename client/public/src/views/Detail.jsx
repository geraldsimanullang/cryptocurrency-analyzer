import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../features/historical-data-slicer";
import Navbar from "../components/Navbar";
import axios from "axios";
import PriceChart from "../components/PriceChart";

export default function Detail() {
  const [coin, setCoin] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [AIAnalysis, setAIAnalysis] = useState("");

  const { name } = useParams();

  const dispatch = useDispatch();
  const { isFetching, data, error, test } = useSelector(
    (state) => state.historicalData
  );

  async function fetchCoin() {
    try {
      const { data } = await axios.get(`http://localhost:3000/coins/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setShowChart(false);
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAIAnalysis() {
    try {
      const dataInJson = JSON.stringify(data);
      const body = { dataInJson };
      const response = await axios.post(
        `http://localhost:3000/coins/${name}/analysis`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setAIAnalysis(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-50">
      <Navbar />
      <div className="flex h-full w-full px-5 py-5 gap-10">
        <div className="flex flex-col items-center gap-3">
          <img src={coin.imgUrl} alt={coin.name} className="h-32" />
          <div className="flex flex-col items-center">
            <p className="text-black">{coin.name}</p>
            <p className="text-slate-500 text-xs">{coin.symbol}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="btn btn-primary btn-sm w-40">
              Add to My Portfolio
            </button>
            <button
              className="btn btn-accent btn-sm w-40"
              onClick={() => {
                dispatch(fetchHistoricalData(name));
                setShowChart(true);
              }}
            >
              Get Historical Data
            </button>
            <button
              className="btn btn-info btn-sm w-40"
              onClick={() => getAIAnalysis()}
            >
              Start AI Analysis
            </button>
          </div>
        </div>
        <div className="w-3/4 flex flex-col items-center">
          <div className="w-full flex justify-end">
            {data?.prices && showChart && <PriceChart />}
          </div>
          <div>
            <p className="text-wrap">{AIAnalysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
