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

    // Detección robusta de cierre de teclado basada en altura
    React.useEffect(() => {
        const handleResize = () => {
            const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            
            // Si la altura vuelve al 90% o más de la original, consideramos teclado cerrado
            if (currentHeight >= initialHeight.current * 0.9) {
                // Pequeño delay para dejar que termine la animación del teclado
                setTimeout(() => setIsFocused(false), 100);
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
    }, []);

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
                    onToggleFocus={setIsFocused}
                />
            </div>
        </div>
    );
};

export default MobileDiaryView;
