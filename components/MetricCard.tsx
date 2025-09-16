
import React from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { Card } from './Card';

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: JSX.Element;
    title: string;
    value: number;
    change: number;
    changeType: 'increase' | 'decrease';
}

const ChangeIndicator: React.FC<{ change: number; type: 'increase' | 'decrease' }> = ({ change, type }) => {
    const isIncrease = type === 'increase';
    const color = isIncrease ? 'text-green-400' : 'text-red-400';
    const Icon = isIncrease ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className={`flex items-center text-sm ${color}`}>
            {Icon}
            <span>{change}%</span>
        </div>
    );
};

export const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, change, changeType, ...props }) => {
    const animatedValue = useAnimatedCounter(value);
    const isFloat = value % 1 !== 0;

    return (
        <Card {...props}>
            <div className="flex justify-between items-start">
                <h3 className="text-brand-slate font-medium">{title}</h3>
                {icon}
            </div>
            <div className="mt-4">
                <p className="text-4xl font-bold text-white">
                    {title === 'Revenu Total' && '$'}
                    {animatedValue.toLocaleString(undefined, {
                      minimumFractionDigits: isFloat ? 2 : 0,
                      maximumFractionDigits: isFloat ? 2 : 0,
                    })}
                    {title === 'Taux de Conversion' && '%'}
                </p>
                <div className="mt-2 flex items-center">
                    <ChangeIndicator change={change} type={changeType} />
                    <span className="text-brand-slate text-sm ml-2">vs semaine dernière</span>
                </div>
            </div>
        </Card>
    );
};
