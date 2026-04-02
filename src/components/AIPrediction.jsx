const severityColor = {
  low:      { bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.2)', text: '#4ade80', label: 'Low risk' },
  moderate: { bg: 'rgba(251,191,36,0.06)', border: 'rgba(251,191,36,0.2)', text: '#fbbf24', label: 'Moderate risk' },
  high:     { bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.2)', text: '#f87171', label: 'High risk' },
  critical: { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.4)',   text: '#ef4444', label: 'Critical risk' },
}

function Tag({ text, color }) {
  return (
    <span style={{
      display: 'inline-block',
      background: `${color}18`,
      border: `1px solid ${color}40`,
      color,
      borderRadius: '6px',
      padding: '3px 10px',
      fontSize: '12px',
      fontFamily: 'var(--mono)',
    }}>{text}</span>
  )
}

export default function AIPrediction({ insights, city, loading }) {
  if (loading) {
    return (
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
        <div style={{ width: '28px', height: '28px', border: '2px solid var(--border)', borderTopColor: 'var(--green)', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--text3)', fontSize: '14px' }}>Generating AI climate analysis...</p>
      </div>
    )
  }

  if (!insights) return null

  const sev = severityColor[insights.severity] || severityColor.moderate

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)' }}>AI climate analysis</h2>
          <p style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)', marginTop: '2px' }}>Powered by Gemini · {city}</p>
        </div>
        <span style={{
          background: sev.bg, border: `1px solid ${sev.border}`,
          color: sev.text, borderRadius: '8px', padding: '6px 14px',
          fontSize: '13px', fontWeight: '600'
        }}>
          {sev.label}
        </span>
      </div>

      <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', padding: '16px', background: 'var(--bg3)', borderRadius: '10px', borderLeft: `3px solid ${sev.text}` }}>
        {insights.summary}
      </p>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: 'var(--text3)', fontSize: '11px', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>10–20 year prediction</p>
        <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.7 }}>{insights.prediction}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ color: 'var(--text3)', fontSize: '11px', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Environmental risks</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {insights.risks?.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--red)', marginTop: '2px', fontSize: '12px' }}>▲</span>
                <span style={{ color: 'var(--text2)', fontSize: '13px' }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ color: 'var(--text3)', fontSize: '11px', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Recommendations</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {insights.recommendations?.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--green)', marginTop: '2px', fontSize: '12px' }}>✓</span>
                <span style={{ color: 'var(--text2)', fontSize: '13px' }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
