
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { EngagementChart } from './components/EngagementChart';
import { ConversionFunnel } from './components/ConversionFunnel';
import { CampaignPerformance } from './components/CampaignPerformance';
import { AiInsights } from './components/AiInsights';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateMarketingSummary } from './services/geminiService';
import type { Campaign } from './types';
import { MOCK_CAMPAIGNS, MOCK_METRICS, MOCK_CHART_DATA } from './constants';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [aiSummary, setAiSummary] = useState('');
    const [generatingSummary, setGeneratingSummary] = useState(false);

    useEffect(() => {
        // Simulate initial data fetch
        setTimeout(() => {
            setCampaigns(MOCK_CAMPAIGNS);
            setLoading(false);
        }, 1500);
    }, []);

    const handleGenerateSummary = useCallback(async () => {
        setGeneratingSummary(true);
        setAiSummary('');
        try {
            const summary = await generateMarketingSummary({
                metrics: MOCK_METRICS,
                campaigns: MOCK_CAMPAIGNS,
                chartData: MOCK_CHART_DATA,
            });
            setAiSummary(summary);
        } catch (error) {
            console.error("Error generating AI summary:", error);
            setAiSummary("An error occurred while generating the summary. Please check the console for details.");
        } finally {
            setGeneratingSummary(false);
        }
    }, []);
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-brand-deep-blue">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-deep-blue text-brand-light-slate p-4 sm:p-6 lg:p-8 font-sans">
            <Header />
            <main className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {MOCK_METRICS.map((metric, index) => (
                        <MetricCard 
                            key={metric.title}
                            icon={metric.icon}
                            title={metric.title}
                            value={metric.value}
                            change={metric.change}
                            changeType={metric.changeType}
                            style={{ animationDelay: `${index * 100}ms` }}
                            className="animate-fadeIn"
                        />
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                        <EngagementChart data={MOCK_CHART_DATA.engagement} />
                    </div>
                    <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '500ms' }}>
                         <ConversionFunnel data={MOCK_CHART_DATA.conversion} />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
                     <div className="lg:col-span-3 animate-fadeIn" style={{ animationDelay: '600ms' }}>
                        <CampaignPerformance campaigns={campaigns} />
                     </div>
                     <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '700ms' }}>
                        <AiInsights 
                            summary={aiSummary}
                            onGenerate={handleGenerateSummary}
                            isLoading={generatingSummary}
                        />
                     </div>
                </div>
            </main>
        </div>
    );
};

export default App;
