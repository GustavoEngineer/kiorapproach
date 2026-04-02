import React, { useState, useEffect } from 'react';
import { typography } from '../../../common/utils/Typography';
import DiaryHeaderResponsive from '../theme/responsive/DiaryHeaderResponsive';

const DiaryHeader = () => {
    const [isResponsive, setIsResponsive] = useState(window.innerWidth < 960);

    // Detectar reducción del 50% (basado en un estándar de ~1920 o 1440, usaremos 960px como umbral)
    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth < 960);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Si es modo responsive, devolvemos el nuevo componente con un contenedor que ocupe el espacio
    if (isResponsive) {
        return (
            <div style={{ 
                height: 'calc(100vh - clamp(0.8rem, 4vw, 3rem))', 
                width: '100%',
                zIndex: 100 
            }}>
                <DiaryHeaderResponsive />
            </div>
        );
    }

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '1.5rem 0',
            pointerEvents: 'none',
            zIndex: 100
        }}>
            {/* El título ha sido removido según solicitud */}
        </header>
    );
};

export default DiaryHeader;
