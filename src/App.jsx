import { useState } from 'react'
import SearchBar from './components/SearchBar'
import StatsCards from './components/StatsCards'
import TrendChart from './components/TrendChart'
import AlertsPanel from './components/AlertsPanel'
import AIPrediction from './components/AIPrediction'
import ForecastChart from './components/ForecastChart'
import { getCurrentWeather, getHistoricalClimate, processMonthlyAverages, computeStats, get10DayForecast } from './services/weatherAPI'
import { getClimateInsights } from './services/geminiAPI'

const DEMO_CITIES = ['Dehradun', 'Mumbai', 'Delhi', 'Bengaluru', 'London', 'Tokyo']

export default function App() {
  const [city, setCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const [monthly, setMonthly] = useState(null)
  const [stats, setStats] = useState(null)
  const [insights, setInsights] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(cityName) {
    setLoading(true)
    setError(null)
    setInsights(null)
    setWeather(null)
    setMonthly(null)
    setStats(null)
    setForecast(null)
    setCity(null)

    try {
      const current = await getCurrentWeather(cityName)
      const { lat, lon } = current.coord
      const historical = await getHistoricalClimate(lat, lon)
      const monthlyData = processMonthlyAverages(historical)
      const statsData = computeStats(historical)
      const forecastData = await get10DayForecast(lat, lon)

      setCity(cityName)
      setWeather(current)
      setMonthly(monthlyData)
      setStats(statsData)
      setForecast(forecastData)
      setLoading(false)

      setAiLoading(true)
      const aiData = await getClimateInsights(cityName, statsData)
      setInsights(aiData)
    } catch (err) {
      console.error(err)
      const status = err?.response?.status
      setError(
        status === 404
          ? `City "${cityName}" not found. Try a different spelling.`
          : 'Something went wrong. Check your API keys in the .env file.'
      )
    } finally {
      setLoading(false)
      setAiLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--green)', fontSize: '12px', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>CLIMATE INTELLIGENCE PLATFORM</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '700', color: 'var(--text)', lineHeight: 1.1, marginBottom: '12px' }}>
            Climate Change<br />
            <span style={{ color: 'var(--green)' }}>Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '15px', maxWidth: '420px', margin: '0 auto 32px' }}>
            Analyze 10 years of real climate data for any city. Powered by AI predictions.
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />

          {/* Demo city chips */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
            {DEMO_CITIES.map(c => (
              <button
                key={c}
                onClick={() => handleSearch(c)}
                disabled={loading}
                style={{
                  background: 'var(--bg3)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  color: 'var(--text3)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--sans)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.color = 'var(--green)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text3)' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center', color: '#f87171', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: '36px', height: '36px', border: '2px solid var(--border)', borderTopColor: 'var(--green)', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: 'var(--text3)', fontSize: '14px' }}>Fetching climate data for {city || '...'}  </p>
          </div>
        )}

        {/* Results */}
        {weather && stats && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="fade-up-1"><StatsCards weather={weather} stats={stats} city={city} /></div>
            <div className="fade-up-2"><TrendChart monthly={monthly} /></div>
            <div className="fade-up-2"><ForecastChart forecast={forecast} /></div>
            <div className="fade-up-3"><AlertsPanel weather={weather} stats={stats} /></div>
            <div className="fade-up-4"><AIPrediction insights={insights} city={city} loading={aiLoading} /></div>
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)', marginTop: '60px' }}>
          Data: OpenWeatherMap · Open-Meteo · Gemini AI
        </p>
      </div>
    </div>
  )
}