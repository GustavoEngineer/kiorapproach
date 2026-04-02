import React from 'react';
import BasicCard from '../../../../common/components/BasicCard';
import WeeklyCarouselResponsive from './WeeklyCarouselResponsive';
import DiaryPageResponsive from './DiaryPageResponsive';
import './DiaryHeaderResponsive.css';

const DiaryHeaderResponsive = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    return (
        <div className="diary-header-responsive">
            <BasicCard style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="diary-header-responsive__content">
                    {/* Sección Superior: Carrusel simplificado interactivo */}
                    <WeeklyCarouselResponsive 
                        selectedDate={selectedDate} 
                        onDateSelect={setSelectedDate} 
                    />
                    
                    <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', margin: '0.5rem 0' }} />

                    {/* Sección Inferior: Editor responsivo cargando la fecha seleccionada */}
                    <DiaryPageResponsive selectedDate={selectedDate} />
                </div>
            </BasicCard>
        </div>
    );
};

export default DiaryHeaderResponsive;
