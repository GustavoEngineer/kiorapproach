import React, { useState } from 'react';
import WeeklyCarouselResponsive from '../responsive/WeeklyCarouselResponsive';
import DiaryPageResponsive from '../responsive/DiaryPageResponsive';
import './MobileDiaryView.css';

/**
 * Mobile-specific view for the tactical diary.
 * Handles the keyboard focus logic to maximize writing space.
 */
const MobileDiaryView = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [isFocused, setIsFocused] = React.useState(false);
    const initialHeight = React.useRef(window.innerHeight);
    const hasShrunk = React.useRef(false);

    // Detección de dispositivo móvil real (Touch + Mobile UA)
    const isMobileDevice = React.useMemo(() => {
        return (window.matchMedia("(pointer: coarse)").matches) || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }, []);

    // Detección robusta de cierre de teclado basada en altura (SOLO MÓVIL)
    React.useEffect(() => {
        if (!isMobileDevice) return;

        const handleResize = () => {
            const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            
            // 1. Detectar si el teclado se ha abierto (altura reducida)
            if (currentHeight < initialHeight.current * 0.8) {
                hasShrunk.current = true;
            }

            // 2. Solo si el teclado estuvo abierto una vez (hasShrunk == true),
            // y ahora la altura vuelve a ser grande (>= 90%), restauramos la UI.
            if (hasShrunk.current && currentHeight >= initialHeight.current * 0.9) {
                // Pequeño delay para dejar que termine la animación del teclado
                setTimeout(() => {
                    setIsFocused(false);
                    hasShrunk.current = false;
                }, 150);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        } else {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            } else {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [isMobileDevice]);

    // Resetear el flag de encogimiento si el foco se quita de forma manual
    const handleToggleFocus = (val) => {
        // Solo aplicar modo foco en dispositivos móviles reales
        if (!isMobileDevice) return;
        
        setIsFocused(val);
        if (!val) hasShrunk.current = false;
    };

    return (
        <div className={`mobile-diary-view ${isFocused ? 'mobile-diary-view--focused' : ''}`}>
            {/* Seccion superior: Se oculta/contrae cuando el teclado está activo */}
            <div className="mobile-diary-view__header-wrapper">
                {!isFocused && (
                    <>
                        <WeeklyCarouselResponsive 
                            selectedDate={selectedDate} 
                            onDateSelect={setSelectedDate} 
                        />
                        <div className="mobile-diary-view__separator" />
                    </>
                )}
            </div>

            {/* Seccion inferior: Ocupa todo el espacio disponible en modo foco */}
            <div className="mobile-diary-view__editor-wrapper">
                <DiaryPageResponsive 
                    selectedDate={selectedDate} 
                    onToggleFocus={handleToggleFocus}
                />
            </div>
        </div>
    );
};

export default MobileDiaryView;
