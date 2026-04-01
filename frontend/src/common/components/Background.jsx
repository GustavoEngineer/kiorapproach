import React from 'react';

const Background = () => {
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0a0a',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                zIndex: -1
            }}
        />
    );
};

export default Background;
