import usePetition from "../hooks/usePetition";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import TopMovers from "../features/dashboard/components/TopMovers";
import MarketDominance from "../features/dashboard/components/MarketDominance";
import TrendChart from "../features/dashboard/components/TrendChart";
import "../features/dashboard/components/Dashboard.css";

function Home() {
  const [cryptos, loading] = usePetition("assets");

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
        <p>Cargando CriptoMarket...</p>
      </div>
    );
  }

  if (!cryptos) return <div className="error">Ocurrió un error al cargar el panel principal. Revise su conexión por favor.</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard del Mercado</h1>
        <p>Resumen analítico y visión general de criptomonedas en tiempo real.</p>
      </div>

      <DashboardStats cryptos={cryptos} />

      <div className="dashboard-details-grid">
        <TopMovers cryptos={cryptos} type="gainers" />
        <TopMovers cryptos={cryptos} type="losers" />
        <MarketDominance cryptos={cryptos} />
      </div>

      <TrendChart />
    </div>
  );
}

export default Home;
