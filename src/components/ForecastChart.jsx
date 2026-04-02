import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function ForecastChart({ forecast }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!forecast || !canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: forecast.labels,
        datasets: [
          {
            label: 'Max Temp (°C)',
            data: forecast.maxTemps,
            borderColor: '#f97316',
            backgroundColor: 'rgba(249,115,22,0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Min Temp (°C)',
            data: forecast.minTemps,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56,189,248,0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#94a3b8' } },
          title: {
            display: true,
            text: '10-Day Temperature Forecast',
            color: '#e2e8f0',
            font: { size: 14 }
          }
        },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
        }
      }
    })

    return () => chartRef.current?.destroy()
  }, [forecast])

  if (!forecast) return null

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}