
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';

interface AiInsightsProps {
    summary: string;
    onGenerate: () => void;
    isLoading: boolean;
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return;
        setDisplayedText(''); // Reset on new text
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(intervalId);
            }
        }, 10); // Adjust speed of typing here
        return () => clearInterval(intervalId);
    }, [text]);

    // This is a simple markdown parser for bold and lists
    const formattedText = displayedText
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-cyan">$1</strong>')
        .replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')

    return <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export const AiInsights: React.FC<AiInsightsProps> = ({ summary, onGenerate, isLoading }) => {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Résumé Hebdomadaire par l'IA</h3>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1.5 text-sm font-semibold bg-brand-cyan/10 text-brand-cyan rounded-md border border-brand-cyan/30 hover:bg-brand-cyan/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {isLoading ? 'Génération...' : 'Régénérer'}
                </button>
            </div>
            <div className="mt-4 flex-grow min-h-[250px] relative">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-light-navy/50 rounded-md">
                        <LoadingSpinner />
                        <p className="mt-2 text-brand-slate text-sm">Analyse des données...</p>
                    </div>
                )}
                {!isLoading && !summary && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-slate/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        <p className="mt-4 text-brand-slate">Cliquez sur "Régénérer" pour obtenir un résumé de la performance de cette semaine, généré par l'IA.</p>
                    </div>
                )}
                {!isLoading && summary && (
                     <div className="text-brand-light-slate space-y-2">
                        <TypingEffect text={summary} />
                     </div>
                )}
            </div>
        </Card>
    );
};
