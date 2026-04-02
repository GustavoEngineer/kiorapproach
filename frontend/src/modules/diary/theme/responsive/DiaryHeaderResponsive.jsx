import React from 'react';
import BasicCard from '../../../../common/components/BasicCard';
import MobileDiaryView from '../mobile/MobileDiaryView';
import './DiaryHeaderResponsive.css';

const DiaryHeaderResponsive = () => {
    return (
        <div className="diary-header-responsive">
            <BasicCard style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="diary-header-responsive__content">
                    <MobileDiaryView />
                </div>
            </BasicCard>
        </div>
    );
};

export default DiaryHeaderResponsive;
