import React from 'react';
import { typography } from '../../../../common/utils/Typography';
import DailySelectionCircle from '../../components/DailySelectionCircle';
import './WeeklyCarouselResponsive.css';

const WeeklyCarouselResponsive = ({ selectedDate, onDateSelect }) => {
    const now = new Date();
    
    // Header for the selected date
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(selectedDate);
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    
    // Fixed Window: Today + next 3
    const timeline = Array.from({ length: 4 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        
        const isActuallyToday = d.getDate() === now.getDate() && 
                                d.getMonth() === now.getMonth() && 
                                d.getFullYear() === now.getFullYear();
                                
        const isSelected = d.getDate() === selectedDate.getDate() && 
                          d.getMonth() === selectedDate.getMonth() && 
                          d.getFullYear() === selectedDate.getFullYear();

        const dayName = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(d);
        const dayNameCap = dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', '');

        return {
            num: d.getDate().toString().padStart(2, '0'),
            fullDate: d,
            isToday: isActuallyToday,
            isSelected,
            name: dayNameCap
        };
    });

    return (
        <div className="weekly-carousel-responsive">
            <div className="weekly-carousel-responsive__header">
                <h2 className="weekly-carousel-responsive__title" style={{ fontFamily: typography.accent }}>
                    Weekly Archive / {capitalizedMonth}
                </h2>
            </div>

            <div className="weekly-carousel-responsive__content">
                {timeline.map((day, idx) => (
                    <div 
                        key={idx} 
                        className={`weekly-carousel-responsive__item ${idx === 0 ? 'weekly-carousel-responsive__item--today' : 'weekly-carousel-responsive__item--future'}`}
                        onClick={() => onDateSelect(day.fullDate)}
                    >
                        {/* Only the first one (Today) shows the name to maintain focus and space */}
                        {idx === 0 && (
                            <span className="weekly-carousel-responsive__day-name" style={{ fontFamily: typography.accent }}>
                                {day.name}
                            </span>
                        )}

                        <DailySelectionCircle 
                            num={day.num}
                            isToday={day.isToday}
                            isSelected={day.isSelected}
                            isCurrentMonth={true}
                            onClick={() => {}} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCarouselResponsive;
