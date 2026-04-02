function Alert({ msg, type }) {
  const colors = {
    danger: { bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.3)', text: '#f87171', dot: '#f87171' },
    warning: { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24', dot: '#fbbf24' },
    info:    { bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.3)', text: '#2dd4bf', dot: '#2dd4bf' },
  }
  const c = colors[type] || colors.info

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '12px', padding: '14px 16px',
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.dot, marginTop: '5px', flexShrink: 0 }} />
      <span style={{ color: c.text, fontSize: '14px' }}>{msg}</span>
    </div>
  )
}

export default function AlertsPanel({ weather, stats }) {
  const alerts = []
  const temp = weather.main.temp
  const humidity = weather.main.humidity
  const trend = parseFloat(stats.trend)

  if (temp > 42) alerts.push({ msg: `Extreme heat: ${temp.toFixed(1)}°C — dangerous conditions`, type: 'danger' })
  else if (temp > 36) alerts.push({ msg: `High temperature: ${temp.toFixed(1)}°C — stay hydrated`, type: 'warning' })

  if (humidity > 88) alerts.push({ msg: `Very high humidity (${humidity}%) — heat stress risk`, type: 'danger' })
  else if (humidity > 75) alerts.push({ msg: `Elevated humidity (${humidity}%) — discomfort likely`, type: 'warning' })

  if (trend > 2) alerts.push({ msg: `Critical warming trend: +${trend}°C over 10 years — urgent action needed`, type: 'danger' })
  else if (trend > 1) alerts.push({ msg: `Significant warming: +${trend}°C over 10 years — above global average`, type: 'warning' })
  else if (trend > 0) alerts.push({ msg: `Mild warming detected: +${trend}°C over 10 years — monitor closely`, type: 'info' })
  else alerts.push({ msg: `No warming trend detected — temperatures stable over 10 years`, type: 'info' })

  const description = weather.weather[0]?.description
  if (description?.includes('storm') || description?.includes('thunder'))
    alerts.push({ msg: `Storm activity detected: ${description}`, type: 'danger' })

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
        Climate alerts
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map((a, i) => <Alert key={i} {...a} />)}
      </div>
    </div>
  )
}
