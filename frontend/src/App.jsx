import React, { useState, useEffect } from 'react';
import Background from './common/components/Background'
import DiaryHeader from './modules/diary/views/DiaryHeader'
import WeeklyCarousel from './modules/diary/components/WeeklyCarousel'
import { DiaryProvider } from './modules/diary/context/DiaryContext'

function App() {
  const [isResponsive, setIsResponsive] = useState(window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => setIsResponsive(window.innerWidth < 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DiaryProvider>
      <div style={{
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 'clamp(0.4rem, 2vw, 1.5rem)',
        fontFamily: 'sans-serif',
        color: '#e0e0e0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <Background />
        <DiaryHeader />
        
        {/* Si no es responsive, mostramos el cuerpo normal, si lo es, el HeaderResponsive ya maneja el contenido */}
        {!isResponsive && (
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <WeeklyCarousel />
          </div>
        )}
      </div>
    </DiaryProvider>
  )
}

export default App
