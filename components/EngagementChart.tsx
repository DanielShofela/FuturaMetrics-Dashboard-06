
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from './Card';
import type { EngagementData } from '../types';

interface EngagementChartProps {
    data: EngagementData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-navy/80 backdrop-blur-sm p-3 border border-cyan-300/20 rounded-md text-sm">
                <p className="label text-white font-bold">{`${label}`}</p>
                <p className="intro text-cyan-400">{`Visiteurs Uniques : ${payload[0].value}`}</p>
                <p className="intro text-violet-400">{`Pages Vues : ${payload[1].value}`}</p>
            </div>
        );
    }
    return null;
};

export const EngagementChart: React.FC<EngagementChartProps> = ({ data }) => {
    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Tendances de l'Engagement Utilisateur</h3>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64ffda" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#64ffda" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(136, 146, 176, 0.2)" />
                        <XAxis dataKey="name" stroke="#8892b0" fontSize={12} />
                        <YAxis stroke="#8892b0" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "14px"}} />
                        <Area type="monotone" dataKey="uv" name="Visiteurs Uniques" stroke="#64ffda" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" name="Pages Vues" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
