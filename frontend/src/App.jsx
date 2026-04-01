import React from 'react';
import Background from './common/components/Background'
import DiaryHeader from './modules/diary/views/DiaryHeader'
import WeeklyCarousel from './modules/diary/components/WeeklyCarousel'

function App() {
  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: '1.5rem',
      fontFamily: 'sans-serif',
      color: '#e0e0e0',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <Background />
      <DiaryHeader />
      
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <WeeklyCarousel />
      </div>
    </div>
  )
}

export default App
