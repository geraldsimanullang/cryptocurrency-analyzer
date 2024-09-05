export default function Card({ coin }) {
  return (
    <div className="flex flex-col gap-4 p-6 items-center max-w-xs max-h-96 border border-gray-300 shadow-lg rounded-lg bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        src={coin.imgUrl}
        alt={`${coin.name}`}
        className="h-24 w-24 object-contain"
      />
      <div className="flex flex-col items-center text-center">
        <p className="text-slate-400 font-semibold text-sm">{coin.symbol}</p>
        <p className="text-gray-800 text-base font-medium">{coin.name}</p>
      </div>
    </div>
  );
}
