// src/App.jsx
import { useEffect, useState } from 'react';

export default function App() {
  const [cape, setCape] = useState('');
  const [hair, setHair] = useState('');
  const [cybertruck, setCybertruck] = useState('');
  const [generatedAvatar, setGeneratedAvatar] = useState('');
  const [loadingText, setLoadingText] = useState('Initialising...');

  // xAI API-Key aus Env laden (füge in .env: REACT_APP_XAI_API_KEY=xai-1X37nJRkCk3BbwDfNjYm86uJ7JpwjMsoTSA2TyugvAxDcM7fYjXx5c0tdTsDaD6cZU0cwoOVYR2GVXo5)
  const xaiApiKey = process.env.REACT_APP_XAI_API_KEY || 'DEIN_FALLBACK_KEY_HIER'; // Für Testing

  useEffect(() => {
    // Statische Assets (Canva-Exports priorisieren, fallback zu Placeholder)
    setCape(process.env.REACT_APP_CAPE_URL || 'https://via.placeholder.com/800x600/000000/FFFFFF?text=Cape+Overlay');
    setHair(process.env.REACT_APP_HAIR_URL || 'https://via.placeholder.com/800x600/000000/FFFFFF?text=Hair+Overlay');
    setCybertruck(process.env.REACT_APP_CYBERTRUCK_URL || 'https://via.placeholder.com/800x600/000000/FFFFFF?text=Cybertruck+Base');

    const generateAvatar = async () => {
      setLoadingText('Gemini is dreaming up the details...');
      
      // 1. SCHRITT: GEMINI für verfeinerte Text-Beschreibung (nutzt deinen Key)
      const geminiPrompt = "Create a vivid, short, single-sentence visual description for an AI image generator. Describe: A 2030 Templar avatar with ash-blond Cobain hair, quantum cape, and eco-Cybertruck background. Cyberpunk style, high resolution.";
      
      try {
        const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC58bVdXO7T0OE0Fum0SdWOX8Urgy7pFYY', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: geminiPrompt }] }]
          })
        });

        if (!geminiResponse.ok) {
          throw new Error('Gemini API error');
        }

        const geminiData = await geminiResponse.json();
        const refinedPrompt = geminiData.candidates[0].content.parts[0].text;
        
        console.log("Gemini Refined Prompt:", refinedPrompt);
        setLoadingText('Forging pixels with xAI...');

        // 2. SCHRITT: xAI API für direkte Bild-Generierung (nutzt den refined Prompt)
        const xAIResponse = await fetch('https://api.x.ai/v1/images/generations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_XAI_API_KEY}`
  },
  body: JSON.stringify({
    prompt: refinedPrompt,
    model: 'grok-2-image',  // Oder 'grok-2-image-1212', je nach Docs
    response_format: 'url',
    n: 1
  })
});
        if (!xAIResponse.ok) {
          throw new Error('xAI API error – fallback to pollinations.ai');
        }

        const xAIData = await xAIResponse.json();
        const imageUrl = xAIData.data[0].url;  // URL des generierten Bilds
        
        setGeneratedAvatar(imageUrl);

      } catch (error) {
        console.error("Fehler:", error);
        setLoadingText('Fallback: Using alternative generator...');

        // Fallback zu pollinations.ai (korrigierter URL-Typo)
        const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(geminiPrompt)}?width=1024&height=1024&nologo=true`;
        setGeneratedAvatar(fallbackUrl);
      }
    };

    generateAvatar();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui', textAlign: 'center', padding: '2rem', background: '#8B0000', color: '#fff', minHeight: '100vh' }}>
      <h1>Rosary©®™ Avatar Forge</h1>
      <h2>2030 Templar – personalised for Rosary-mom</h2>
      <p>1.87 m • 87 kg • 65 yo • ash-blond Cobain hair • Cybertruck pilgrim</p>
      
      <div style={{ margin: '3rem auto', position: 'relative', maxWidth: '800px', height: '800px', overflow: 'hidden', borderRadius: '15px', boxShadow: '0 0 50px rgba(255,255,255,0.5)' }}>
        
        {/* Ladebildschirm oder Fertiges Bild */}
        {!generatedAvatar ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#220000' }}>
            <p style={{ animation: 'pulse 1s infinite' }}>{loadingText}</p>
          </div>
        ) : (
          <>
            {/* Overlays für Cape, Hair, Cybertruck (aus Canva oder statisch) */}
            {cybertruck && <img src={cybertruck} alt="Cybertruck Base" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto', opacity: 0.8 }} />}
            {cape && <img src={cape} alt="Quantum Cape" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', opacity: 0.7 }} />}
            {hair && <img src={hair} alt="Hair Overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', opacity: 0.9 }} />}
            <img 
              src={generatedAvatar} 
              alt="AI-Generated Avatar" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'reveal 2s ease-in' }} 
            />
          </>
        )}
      </div>

      {/* Buy-Button mit Link zu deinem Shop */}
      <a href="https://rosary.health/shop/" target="_blank" rel="noopener noreferrer">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem', cursor: 'pointer', background: '#FFD700', color: '#000', border: 'none', borderRadius: '5px' }}>
          Buy Avatar for $9.99 in Shop
        </button>
      </a>
      
      <p>Live - refresh to see new generations. Powered by Gemini & xAI.</p>
      
      <style>{`
        @keyframes reveal {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
