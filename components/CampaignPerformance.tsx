
import React from 'react';
import { Card } from './Card';
import type { Campaign } from '../types';

interface CampaignPerformanceProps {
    campaigns: Campaign[];
}

const getStatusClass = (status: Campaign['status']) => {
    switch (status) {
        case 'Actif':
            return 'bg-green-500';
        case 'En pause':
            return 'bg-yellow-500';
        case 'Terminée':
            return 'bg-gray-500';
        default:
            return 'bg-gray-500';
    }
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const CampaignPerformance: React.FC<CampaignPerformanceProps> = ({ campaigns }) => {
    return (
        <Card>
            <h3 className="text-lg font-bold text-white mb-4">Performance des Campagnes</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-cyan-300/20 text-brand-slate uppercase">
                        <tr>
                            <th className="p-3">Campagne</th>
                            <th className="p-3 text-center">Statut</th>
                            <th className="p-3 text-right">Dépensé</th>
                            <th className="p-3 text-right">Budget</th>
                            <th className="p-3 text-right">ROI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="border-b border-cyan-300/10 hover:bg-brand-navy/50 transition-colors">
                                <td className="p-3 font-medium text-white">{campaign.name}</td>
                                <td className="p-3 text-center">
                                    <span className="flex items-center justify-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${getStatusClass(campaign.status)} ${campaign.status === 'Actif' ? 'animate-pulse' : ''}`}></span>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="p-3 text-right font-mono">{formatCurrency(campaign.spent)}</td>
                                <td className="p-3 text-right font-mono text-brand-slate">{formatCurrency(campaign.budget)}</td>
                                <td className={`p-3 text-right font-bold ${campaign.roi > 3 ? 'text-green-400' : 'text-brand-light-slate'}`}>
                                    {campaign.roi.toFixed(1)}x
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
