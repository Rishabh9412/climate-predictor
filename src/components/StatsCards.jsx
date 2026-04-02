const card = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '20px 24px',
}

function Stat({ label, value, unit, color }) {
  return (
    <div style={card}>
      <p style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ fontSize: '28px', fontWeight: '700', color: color || 'var(--text)', lineHeight: 1 }}>
        {value}
        <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text2)', marginLeft: '4px' }}>{unit}</span>
      </p>
    </div>
  )
}

export default function StatsCards({ weather, stats, city }) {
  const trendColor = stats.trend > 1.5 ? 'var(--red)' : stats.trend > 0.5 ? 'var(--amber)' : 'var(--green)'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
      <Stat label="City" value={city} color="var(--green)" />
      <Stat label="Current temp" value={weather.main.temp.toFixed(1)} unit="°C" color="var(--amber)" />
      <Stat label="Avg temp (10yr)" value={stats.avgTemp} unit="°C" color="var(--teal)" />
      <Stat label="Record high" value={stats.maxTemp} unit="°C" color="var(--red)" />
      <Stat label="Yearly rainfall" value={stats.yearlyRain} unit="mm" color="var(--teal)" />
      <Stat
        label="Temp trend"
        value={`${stats.trend > 0 ? '+' : ''}${stats.trend}`}
        unit="°C / 10yr"
        color={trendColor}
      />
    </div>
  )
}
