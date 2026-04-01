import React from 'react';
import { typography } from '../../../common/utils/Typography';

const DiaryHeader = () => {
    // Obtener el mes actual en español y capitalizar la primera letra
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
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
