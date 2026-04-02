import React, { useState } from 'react';
import WeeklyCarouselResponsive from '../responsive/WeeklyCarouselResponsive';
import DiaryPageResponsive from '../responsive/DiaryPageResponsive';
import './MobileDiaryView.css';

/**
 * Mobile-specific view for the tactical diary.
 * Handles the keyboard focus logic to maximize writing space.
 */
const MobileDiaryView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isFocused, setIsFocused] = useState(false);

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
