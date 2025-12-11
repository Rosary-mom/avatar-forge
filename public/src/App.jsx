import { useEffect, useState } from 'react'

export default function App() {
  const [cape, setCape] = useState('')
  const [hair, setHair] = useState('')

  useEffect(() => {
    setCape('/generated/cape-pattern.svg')
    setHair('/generated/hair-silhouette.svg')
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', textAlign: 'center', padding: '2rem', background: '#0d0d0d', color: '#fff', minHeight: '100vh' }}>
      <h1>Rosary Avatar Forge</h1>
      <h2>2030 Templar – personalised for Rosary-mom</h2>
      <p>1.87 m • 87 kg • 65 yo • ash-blond Cobain hair • Cybertruck pilgrim</p>
      
      <div style={{ margin: '3rem', position: 'relative', display: 'inline-block' }}>
        {cape && <img src={cape} alt="Quantum Templar Cape" width={400} />}
        {hair && <img src={hair} style={{ position: 'absolute', top: 0, left: 0 }} width={400} />}
      </div>

      <p>Next: sliders for quantum-cross intensity, hair chaos, music-sync pulses…</p>
      <p><small>Live preview updates on every push → Netlify</small></p>
    </div>
  )
}
