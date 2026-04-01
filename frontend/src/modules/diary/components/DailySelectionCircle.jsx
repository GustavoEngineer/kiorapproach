import React from 'react';
import './DailySelectionCircle.css';
import { typography } from '../../../common/utils/Typography';

const DailySelectionCircle = ({ num, isToday, isSelected, isCurrentMonth, onClick }) => {
    return (
        <div 
            className={`daily-selection-circle ${isToday ? 'daily-selection-circle--today' : ''} ${isSelected ? 'daily-selection-circle--selected' : ''} ${!isCurrentMonth ? 'daily-selection-circle--other-month' : ''}`}
            onClick={onClick}
        >
            <div className="daily-selection-circle__focus">
                <span className="daily-selection-circle__num" style={{ fontFamily: typography.accent }}>
                    {num}
                </span>
            </div>
        </div>
    );
};

export default DailySelectionCircle;
