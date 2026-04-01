import React from 'react';
import BasicCard from '../../../common/components/BasicCard';
import { typography } from '../../../common/utils/Typography';
import DailySelectionCircle from './DailySelectionCircle';
import DiaryPage from './DiaryPage';
import './WeeklyCarousel.css';

const WeeklyCarousel = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(selectedDate);
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // ... getWeekDates remains similarly but we use selectedDate for reference if needed ...
    const getWeekDates = () => {
        const now = new Date();
        const todayStr = now.getDate().toString().padStart(2, '0');
        const todayMonth = now.getMonth();
        const todayYear = now.getFullYear();

        const currentMonth = now.getMonth();
        const dayOfWeek = now.getDay(); 
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 

        const monday = new Date(new Date().setDate(diff));
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            
            const isToday = date.getDate().toString().padStart(2, '0') === todayStr && 
                           date.getMonth() === todayMonth && 
                           date.getFullYear() === todayYear;

            return {
                num: date.getDate().toString().padStart(2, '0'),
                isCurrentMonth: date.getMonth() === currentMonth,
                isToday,
                fullDate: date
            };
        });
    };

    const weekData = getWeekDates();

    const days = [
        { name: 'Lun', id: 'lun', ...weekData[0] },
        { name: 'Mar', id: 'mar', ...weekData[1] },
        { name: 'Mié', id: 'mie', ...weekData[2] },
        { name: 'Jue', id: 'jue', ...weekData[3] },
        { name: 'Vie', id: 'vie', ...weekData[4] },
        { name: 'Sáb', id: 'sab', ...weekData[5] },
        { name: 'Dom', id: 'dom', ...weekData[6] },
    ];

    const isSelected = (dayNum) => {
        return dayNum === selectedDate.getDate().toString().padStart(2, '0');
    };

    return (
        <div className="weekly-carousel">
            <BasicCard style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="weekly-carousel__inner">
                    <div className="weekly-carousel__header">
                        <h2 className="weekly-carousel__title" style={{ fontFamily: typography.accent }}>
                            Weekly Archive / {capitalizedMonth}
                        </h2>
                    </div>

                    <div className="weekly-carousel__content">
                        <div className="weekly-carousel__list">
                            {days.map((day) => (
                                <div 
                                    key={day.id} 
                                    className={`weekly-carousel__item ${day.isToday ? 'weekly-carousel__item--today' : ''} ${!day.isCurrentMonth ? 'weekly-carousel__item--other-month' : ''} ${isSelected(day.num) ? 'weekly-carousel__item--selected' : ''}`}
                                >
                                    <div className="weekly-carousel__info">
                                        <span className="weekly-carousel__name" style={{ fontFamily: typography.accent }}>
                                            {day.name}
                                        </span>
                                        
                                        <DailySelectionCircle 
                                            num={day.num}
                                            isToday={day.isToday}
                                            isSelected={isSelected(day.num)}
                                            isCurrentMonth={day.isCurrentMonth}
                                            onClick={() => setSelectedDate(day.fullDate)}
                                        />
                                    </div>

                                    {day.isToday && <div className="weekly-carousel__marker" />}
                                </div>
                            ))}
                        </div>
                        
                        <DiaryPage selectedDate={selectedDate} />
                    </div>
                </div>
            </BasicCard>
        </div>
    );
};

export default WeeklyCarousel;
