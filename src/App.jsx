import { useEffect, useState } from 'react'

export default function App() {
  const [cape, setCape] = useState('')
  const [hair, setHair] = useState('')

  useEffect(() => {
    setCape('./generated/cape-pattern.svg')  // Relative path fix
    setHair('./generated/hair-silhouette.svg')  // Relative path fix
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', textAlign: 'center', padding: '2rem', background: '#8B0000', color: '#fff', minHeight: '100vh' }}>
      <h1>Rosary© ®™ Avatar Forge</h1>
      <h2>2030 Templar – personalised for Rosary-mom</h2>
      <p>1.87 m • 87 kg • 65 yo • ash-blond Cobain hair • Cybertruck pilgrim</p>
      
      <div style={{ margin: '3rem', position: 'relative', display: 'inline-block', animation: 'reveal 2s ease-in', filter: 'brightness(1.2) contrast(1.1)', boxShadow: '0 0 50px rgba(255,255,255,0.5)' }}>
        {cape && <img src={cape} alt="Quantum Templar Cape" style={{ width: '800px', height: 'auto' }} />}
        {hair && <img src={hair} style={{ position: 'absolute', top: 0, left: 0, width: '800px', height: 'auto' }} />}
      </div>

      <p>Live - refresh to see new generations</p>
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
