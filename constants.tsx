
import React from 'react';
import type { Campaign, Metric, ChartData } from './types';

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const RevenueIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 012 2v10a2 2 0 01-2 2h-4v-1m-4-1v1H4a2 2 0 01-2-2V7a2 2 0 012-2h4v1m0 9.01V16" />
    </svg>
);

const ConversionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const ClicksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
);


export const MOCK_METRICS: Metric[] = [
    { icon: <UsersIcon />, title: "Utilisateurs Totaux", value: 78349, change: 12.5, changeType: 'increase' },
    { icon: <RevenueIcon />, title: "Revenu Total", value: 124567, change: 8.2, changeType: 'increase' },
    { icon: <ConversionIcon />, title: "Taux de Conversion", value: 3.54, change: 0.5, changeType: 'decrease' },
    { icon: <ClicksIcon />, title: "Clics Totaux", value: 982345, change: 21.3, changeType: 'increase' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
    { id: 1, name: "Lancement Projet Titan", status: "Actif", budget: 50000, spent: 32050, roi: 2.8 },
    { id: 2, name: "Ventes Flash d'Été", status: "Actif", budget: 75000, spent: 68200, roi: 3.5 },
    { id: 3, name: "Engagement Social T4", status: "En pause", budget: 30000, spent: 15000, roi: 1.9 },
    { id: 4, name: "Teaser Projet Nébula", status: "Terminée", budget: 20000, spent: 20000, roi: 4.1 },
    { id: 5, name: "Concours des Fêtes", status: "Terminée", budget: 100000, spent: 98500, roi: 3.8 },
];

export const MOCK_CHART_DATA: ChartData = {
    engagement: [
        { name: 'Jan', uv: 4000, pv: 2400 },
        { name: 'Fév', uv: 3000, pv: 1398 },
        { name: 'Mar', uv: 2000, pv: 9800 },
        { name: 'Avr', uv: 2780, pv: 3908 },
        { name: 'Mai', uv: 1890, pv: 4800 },
        { name: 'Jui', uv: 2390, pv: 3800 },
        { name: 'Juil', uv: 3490, pv: 4300 },
    ],
    conversion: [
        { name: 'Visiteurs', value: 5000 },
        { name: 'Inscriptions', value: 4000 },
        { name: 'Engagés', value: 2500 },
        { name: 'Convertis', value: 1500 },
        { name: 'Parrainages', value: 500 },
    ],
};
