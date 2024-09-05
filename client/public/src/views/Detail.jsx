import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../features/historical-data-slicer";
import Navbar from "../components/Navbar";
import axios from "axios";
import PriceChart from "../components/PriceChart";
import analyzingAnimation from "../assets/analyzingAnimation.svg"

export default function Detail() {
  const [coin, setCoin] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [analyzing, setAnalyzing] = useState(false)
  const [rawAIAnalysis, setRawAIAnalysis] = useState("");
  const [nameAIAnalysis, setNameAIAnalysis] = useState("");
  const [fromAIAnalysis, setFromAIAnalysis] = useState("");
  const [toAIAnalysis, setToAIAnalysis] = useState("");
  const [performanceAIAnalysis, setPerformanceAIAnalysis] = useState("");
  const [predictionAIAnalysis, setPredictionAIAnalysis] = useState("");
  const [recommendationAIAnalysis, setRecommendationAIAnalysis] = useState("");

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
      setAnalyzing(true)
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

      setRawAIAnalysis(response.data);

      const parsedAnalysis = JSON.parse(response.data)

      setNameAIAnalysis(parsedAnalysis.name)
      setFromAIAnalysis(parsedAnalysis.from)
      setToAIAnalysis(parsedAnalysis.to)
      setPerformanceAIAnalysis(parsedAnalysis.performance)
      setPredictionAIAnalysis(parsedAnalysis.prediction)
      setRecommendationAIAnalysis(parsedAnalysis.recommendation)

    } catch (error) {
      console.log(error);
    } finally {
      setAnalyzing(false)
    }
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-slate-100">
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
            {showChart && <button
              className="btn btn-info btn-sm w-40"
              onClick={() => getAIAnalysis()}
            >
              Start AI Analysis
            </button>}
          </div>
        </div>
        <div className="w-3/4 flex flex-col items-center">
          <div className="w-full flex justify-end mb-3">
            {data?.prices && showChart && <PriceChart />}
          </div>
          { analyzing &&
            <div className="flex flex-col w-full items-center">
              <img src={analyzingAnimation} className="w-16"/>
              <p className="text-black text-sm">Analyzing...</p>
            </div>
          }
          {rawAIAnalysis &&
            <div>
              <p className="text-wrap text-black"><span className="font-semibold">Coin Name:</span> {nameAIAnalysis}</p>
              <p className="text-wrap text-black"><span className="font-semibold">Date Range:</span> {fromAIAnalysis} - {toAIAnalysis}</p>
              <p className="text-wrap text-black mt-2 font-semibold">Performance Analysis:</p>
              <p className="text-wrap text-black">{performanceAIAnalysis}</p>
              <p className="text-wrap text-black mt-2 font-semibold">Prediction:</p>
              <p className="text-wrap text-black">{predictionAIAnalysis}</p>
              <p className="text-wrap text-black mt-2 font-semibold">Recommendation:</p>
              <p className="text-wrap text-black">{recommendationAIAnalysis}</p>
            </div>}
        </div>
      </div>
    </div>
  );
}
