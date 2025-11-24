// Tidak perlu mengimpor 'React' di Next.js
import { useState, useEffect } from 'react';
import { RefreshCcw, Star, TrendingUp } from 'lucide-react'; 

// Data simulasi untuk leaderboard
const MOCK_RANKING_DATA = [
  { rank: 1, name: "AlphaUser", score: 9850, change: '+1' },
  { rank: 2, name: "BetaBuster", score: 8730, change: '0' },
  { rank: 3, name: "GammaGuru", score: 7612, change: '-1' },
  { rank: 4, name: "DeltaDev", score: 6590, change: '+2' },
  { rank: 5, name: "EpsilonEng", score: 5400, change: '0' },
  { rank: 6, name: "ZetaZen", score: 4321, change: '-3' },
];

/**
 * Komponen utama aplikasi leaderboard.
 * Di Next.js App Router, nama fungsi ini akan menjadi halaman default.
 */
const App = () => {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi pengambilan data
  useEffect(() => {
    // Fungsi ini hanya berjalan sekali saat komponen dimuat
    setTimeout(() => {
      setRanking(MOCK_RANKING_DATA);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Fungsi untuk memuat ulang (simulasi)
  const handleRefresh = () => {
    setIsLoading(true);
    setRanking([]);
    setTimeout(() => {
      // Perbarui skor secara acak
      const newRanking = MOCK_RANKING_DATA.map(item => ({
        ...item,
        score: item.score + Math.floor(Math.random() * 500) 
      })).sort((a, b) => b.score - a.score).map((item, index) => ({
        ...item,
        rank: index + 1 
      }));
      setRanking(newRanking);
      setIsLoading(false);
    }, 1000);
  };

  /**
   * Helper untuk mendapatkan style berdasarkan perubahan peringkat
   */
  const getChangeStyle = (change) => {
    const numChange = parseInt(change);
    if (numChange > 0) return 'text-green-500 bg-green-100 dark:bg-green-900/50 p-1 rounded-full';
    if (numChange < 0) return 'text-red-500 bg-red-100 dark:bg-red-900/50 p-1 rounded-full';
    return 'text-gray-500 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-full';
  };

  /**
   * Komponen Baris Peringkat
   */
  const RankingItem = ({ item }) => {
    const isTopThree = item.rank <= 3;
    const rankColor = isTopThree ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-400';
    const rankSize = isTopThree ? 'text-2xl font-bold' : 'text-xl font-semibold';

    return (
      <div className={`flex items-center justify-between p-4 border-b last:border-b-0 transition-all ${isTopThree ? 'bg-yellow-50/50 dark:bg-gray-800 border-yellow-200 dark:border-yellow-900' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
        {/* Peringkat dan Nama */}
        <div className="flex items-center space-x-4">
          <div className={`${rankSize} ${rankColor} w-10 text-center flex items-center justify-center`}>
            {isTopThree && <Star fill={rankColor.split('-')[1]} size={16} className="mr-1 hidden sm:block" />}
            {item.rank}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg text-gray-800 dark:text-gray-200">{item.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">@farcaster_user</span>
          </div>
        </div>

        {/* Skor dan Perubahan */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {item.score.toLocaleString()}
          </span>
          <div className={getChangeStyle(item.change)}>
            <TrendingUp size={16} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-sans flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
            Farcaster Ranking (Mini)
          </h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition disabled:bg-indigo-400 dark:shadow-none"
          >
            <RefreshCcw size={16} className={isLoading ? 'animate-spin mr-2' : 'mr-2'} />
            {isLoading ? 'Memuat...' : 'Muat Ulang'}
          </button>
        </header>

        {/* Kotak Leaderboard Utama */}
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {isLoading ? (
            // Skeleton Loader
            <div className="p-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center justify-between animate-pulse p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                </div>
              ))}
            </div>
          ) : (
            // Daftar Ranking
            <div>
              {ranking.map((item) => (
                <RankingItem key={item.rank} item={item} />
              ))}
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Data disimulasikan. Hubungkan ke API Farcaster untuk data nyata!
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}; // <-- Kurung kurawal penutup fungsi App sudah diperbaiki di sini

export default App; // Ekspor default
