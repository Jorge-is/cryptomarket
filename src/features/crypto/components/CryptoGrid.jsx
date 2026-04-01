import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePetition from "../../../hooks/usePetition";
import { Search, SlidersHorizontal, Star, TrendingUp, TrendingDown } from "lucide-react";
import { useFavorites } from "../../profile/hooks/useFavorites";
import { formatCurrency, parseFloatNumber } from "../../../utils/numbers";
import "./CryptoGrid.css";

function CryptoGrid() {
  const [cryptos, loading] = usePetition("assets");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando mercado...</p>
      </div>
    );
  }

  if (!cryptos) return <span className="error">Ocurrió un error al cargar las criptomonedas.</span>;

  let filteredCryptos = cryptos.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredCryptos = filteredCryptos.sort((a, b) => {
    if (sortBy === "rank") return parseInt(a.rank) - parseInt(b.rank);
    if (sortBy === "price_desc") return parseFloat(b.priceUsd) - parseFloat(a.priceUsd);
    if (sortBy === "price_asc") return parseFloat(a.priceUsd) - parseFloat(b.priceUsd);
    if (sortBy === "change_desc") return parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr);
    if (sortBy === "change_asc") return parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr);
    return 0;
  });

  return (
    <div className="crypto-grid-view">
      <div className="crypto-grid-header">
        <h1>Activos principales por capitalización</h1>
        <p className="subtitle">Explora el mercado global de criptomonedas en tiempo real.</p>
      </div>

      <div className="crypto-filters">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <SlidersHorizontal className="filter-icon" size={18} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
             <option value="rank">Capitalización</option>
             <option value="price_desc">Mayor Precio</option>
             <option value="price_asc">Menor Precio</option>
             <option value="change_desc">Top Ganadoras</option>
             <option value="change_asc">Top Perdedoras</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="crypto-table">
          <thead>
            <tr>
              <th className="th-star"></th>
              <th className="th-rank">#</th>
              <th className="th-name">Nombre</th>
              <th className="text-right">Precio</th>
              <th className="text-right">24h %</th>
              <th className="text-right d-none-mobile">Cap de mercado</th>
              <th className="text-right d-none-mobile">Volumen (24h)</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.length > 0 ? (
              filteredCryptos.map((crypto) => {
                const isPositive = crypto.changePercent24Hr > 0;
                const favState = isFavorite(crypto.id);

                return (
                  <tr key={crypto.id} className="crypto-row" onClick={() => navigate(`/criptomonedas/${crypto.id}`)}>
                    <td className="td-star" onClick={(e) => { e.stopPropagation(); toggleFavorite(crypto.id); }}>
                      <Star 
                        color={favState ? "#FCD34D" : "var(--text-muted)"} 
                        fill={favState ? "#FCD34D" : "none"} 
                        size={18} 
                        strokeWidth={favState ? 0 : 2}
                      />
                    </td>
                    <td className="td-rank">{crypto.rank}</td>
                    <td className="td-name">
                      <div className="crypto-name-container">
                        <img 
                          src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} 
                          alt={crypto.name} 
                          className="table-crypto-logo" 
                          onError={(e) => { e.target.src = 'https://coincap.io/static/logo_mark.png' }}
                        />
                        <span className="crypto-name-fw">{crypto.name}</span>
                        <span className="crypto-symbol-fw">{crypto.symbol}</span>
                      </div>
                    </td>
                    <td className="text-right td-price">{formatCurrency(crypto.priceUsd)}</td>
                    <td className={`text-right td-change ${isPositive ? 'text-success' : 'text-danger'}`}>
                      <span className="change-content">
                        {isPositive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                        {parseFloatNumber(crypto.changePercent24Hr)}%
                      </span>
                    </td>
                    <td className="text-right d-none-mobile td-muted">{formatCurrency(crypto.marketCapUsd)}</td>
                    <td className="text-right d-none-mobile td-muted">{formatCurrency(crypto.volumeUsd24Hr)}</td>
                    <td className="text-center td-action">
                      <button className="btn-buy-pill" onClick={(e) => { e.stopPropagation(); navigate(`/criptomonedas/${crypto.id}`); }}>
                        Comprar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">
                  <div className="empty-search">
                    <p>No se encontraron resultados para "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoGrid;
