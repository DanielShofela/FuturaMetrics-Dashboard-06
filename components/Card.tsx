
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={`
                bg-brand-light-navy/50 backdrop-blur-sm 
                border border-cyan-300/20 rounded-lg p-6 
                transition-all duration-300 ease-out
                hover:shadow-glow-cyan hover:-translate-y-2
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};
