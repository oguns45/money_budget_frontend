import React from 'react';
import './Button.css';

interface ButtonProps {
    name?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    bg?: string;
    bPad?: string;
    color?: string;
    bRad?: string;
    iColor?: string; // Added iColor for icon color
    hColor?: string; // Added hColor for hover color
}

const Button: React.FC<ButtonProps> = ({ 
    name, 
    icon, 
    onClick, 
    bg, 
    bPad, 
    color, 
    bRad, 
    iColor, 
    hColor 
}) => {
    const inlineStyles = {
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
    };

    return (
        <button 
            className="button" 
            style={inlineStyles} 
            onClick={onClick}
        >
            {icon && <span style={{ color: iColor }} className="icon">{icon}</span>}
            {name}
        </button>
    );
};

export default Button;
