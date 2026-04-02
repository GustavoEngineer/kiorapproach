import React from 'react';
import './TacticalScrollContainer.css';

/**
 * Reusable container that applies a subtle tactical scrollbar to its children.
 * @param {Object} props
 * @param {String} props.className - Additional classes for the container
 * @param {Object} props.style - Inline styles for the container
 * @param {React.ReactNode} props.children - Content to be scrolled
 * @param {Object} props.rest - Other standard div props
 */
const TacticalScrollContainer = ({ children, className = '', style = {}, ...rest }) => {
    return (
        <div 
            className={`tactical-scroll ${className}`} 
            style={{ 
                overflowY: 'auto', 
                overflowX: 'hidden', 
                height: '100%', 
                width: '100%',
                ...style 
            }} 
            {...rest}
        >
            {children}
        </div>
    );
};

export default TacticalScrollContainer;
