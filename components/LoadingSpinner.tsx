
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="relative h-20 w-20">
            <div className="absolute top-0 left-0 h-full w-full border-4 border-t-brand-cyan border-transparent rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 h-full w-full border-2 border-b-cyan-300/50 border-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute flex items-center justify-center h-full w-full">
                <div className="h-2 w-2 bg-brand-cyan rounded-full shadow-glow-cyan"></div>
            </div>
        </div>
    );
};
