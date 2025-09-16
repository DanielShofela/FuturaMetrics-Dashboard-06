
import React from 'react';
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList } from 'recharts';
import { Card } from './Card';
import type { ConversionData } from '../types';

interface ConversionFunnelProps {
    data: ConversionData[];
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data }) => {
    const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

    const funnelData = data.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length]
    }));

    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Entonnoir de Conversion</h3>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(17, 34, 64, 0.8)', 
                                borderColor: 'rgba(100, 255, 218, 0.3)',
                                color: '#a8b2d1'
                            }}
                        />
                        <Funnel
                            dataKey="value"
                            data={funnelData}
                            isAnimationActive
                        >
                           <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
                        </Funnel>
                    </FunnelChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
