import React from 'react';
import './BasicCard.css';

const BasicCard = ({ children, style, hideBorders = false, onClick }) => {
    return (
        <div className="basic-card" style={style} onClick={onClick}>
            {!hideBorders && (
                <>
                    {/* ── Esquinas en L ── */}
                    <span className="basic-card__corner basic-card__corner--tl" />
                    <span className="basic-card__corner basic-card__corner--tr" />
                    <span className="basic-card__corner basic-card__corner--bl" />
                    <span className="basic-card__corner basic-card__corner--br" />

                    {/* ── Líneas laterales ── */}
                    <span className="basic-card__side basic-card__side--h basic-card__side--top" />
                    <span className="basic-card__side basic-card__side--h basic-card__side--bottom" />
                    <span className="basic-card__side basic-card__side--v basic-card__side--left" />
                    <span className="basic-card__side basic-card__side--v basic-card__side--right" />
                </>
            )}

            {/* Contenido */}
            <div className="basic-card__content" style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column' 
            }}>
                {children}
            </div>
        </div>
    );
};

export default BasicCard;
