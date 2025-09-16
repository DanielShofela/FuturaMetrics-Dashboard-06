
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center animate-fadeIn" style={{ animationDelay: '0ms'}}>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                    Futura<span className="text-brand-cyan">Metrics</span>
                </h1>
                <p className="text-sm text-brand-slate mt-1">Tableau de Bord d'Intelligence Marketing</p>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-brand-light-slate hidden sm:block">Bienvenue, Alex</span>
                <img
                    src="https://picsum.photos/seed/user1/100/100"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-brand-cyan/50"
                />
            </div>
        </header>
    );
};
