import { useState } from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    gap: '12px',
    maxWidth: '560px',
    margin: '0 auto',
  },
  input: {
    flex: 1,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '14px 20px',
    color: 'var(--text)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  btn: {
    background: 'var(--green)',
    color: '#0a0f0d',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.15s, background 0.2s',
    fontFamily: 'var(--sans)',
  }
}

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  function handleSubmit() {
    if (input.trim()) onSearch(input.trim())
  }

  return (
    <div style={styles.wrapper}>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter any city — e.g. Dehradun, Mumbai, London..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        onFocus={e => e.target.style.borderColor = 'var(--green)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
        disabled={loading}
      />
      <button
        style={{
          ...styles.btn,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
        onClick={handleSubmit}
        disabled={loading}
        onMouseEnter={e => { if (!loading) e.target.style.background = 'var(--green2)' }}
        onMouseLeave={e => { e.target.style.background = 'var(--green)' }}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  )
}
