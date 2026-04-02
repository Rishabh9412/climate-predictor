import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, LineElement, BarElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Legend, Filler
} from 'chart.js'

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#9ab89d', font: { family: 'Space Grotesk', size: 12 }, boxWidth: 12 }
    },
    tooltip: {
      backgroundColor: '#1a2a1e',
      borderColor: '#2a3f2e',
      borderWidth: 1,
      titleColor: '#e8f5ea',
      bodyColor: '#9ab89d',
    }
  },
  scales: {
    x: {
      ticks: { color: '#5a7a5e', font: { size: 11 }, maxTicksLimit: 12 },
      grid: { color: '#1a2a1e' },
    },
    y: {
      ticks: { color: '#5a7a5e', font: { size: 11 } },
      grid: { color: '#1e2e22' },
    }
  }
}

const tabStyle = (active) => ({
  padding: '8px 20px',
  borderRadius: '8px',
  border: active ? '1px solid var(--green-dim)' : '1px solid transparent',
  background: active ? 'var(--bg3)' : 'transparent',
  color: active ? 'var(--green)' : 'var(--text3)',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  fontFamily: 'var(--sans)',
  transition: 'all 0.2s',
})

export default function TrendChart({ monthly }) {
  const [tab, setTab] = useState('temp')

  const { labels, avgMax, avgMin, totalRain } = monthly

  const tempData = {
    labels,
    datasets: [
      {
        label: 'Max temp (°C)',
        data: avgMax,
        borderColor: '#f87171',
        backgroundColor: 'rgba(248,113,113,0.08)',
        tension: 0.4,
        pointRadius: 0,
        fill: true,
      },
      {
        label: 'Min temp (°C)',
        data: avgMin,
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45,212,191,0.06)',
        tension: 0.4,
        pointRadius: 0,
        fill: true,
      }
    ]
  }

  const rainData = {
    labels,
    datasets: [{
      label: 'Monthly rainfall (mm)',
      data: totalRain,
      backgroundColor: 'rgba(45,212,191,0.5)',
      borderColor: '#2dd4bf',
      borderWidth: 1,
      borderRadius: 2,
    }]
  }

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)' }}>Historical climate data</h2>
          <p style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--mono)', marginTop: '2px' }}>2015 — 2024 monthly averages</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={tabStyle(tab === 'temp')} onClick={() => setTab('temp')}>Temperature</button>
          <button style={tabStyle(tab === 'rain')} onClick={() => setTab('rain')}>Rainfall</button>
        </div>
      </div>
      <div style={{ height: '280px' }}>
        {tab === 'temp'
          ? <Line data={tempData} options={CHART_OPTS} />
          : <Bar data={rainData} options={CHART_OPTS} />
        }
      </div>
    </div>
  )
}
