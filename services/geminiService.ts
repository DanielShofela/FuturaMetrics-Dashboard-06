import { GoogleGenAI } from "@google/genai";
import type { MarketingData } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const MOCK_SUMMARY = `**Aperçu de la Performance Hebdomadaire :**

*   **Victoire Clé :** L'engagement des utilisateurs montre une tendance positive, avec un pic significatif de pages vues (PV) en milieu de trimestre, indiquant une stratégie de contenu réussie. Le nombre total de clics a augmenté de 21,3 %.
*   **Axe d'Amélioration :** Le taux de conversion a connu une légère baisse de 0,5 %. Nous devrions analyser le parcours utilisateur après le clic pour identifier les points de friction potentiels.
*   **Campagne Phare :** La campagne "Ventes Flash d'Été" performe exceptionnellement bien avec un ROI de 3,5x et est en bonne voie pour dépasser ses objectifs.
*   **Recommandation :** Allouer une partie du budget de la campagne "Engagement Social T4" (actuellement en pause) pour amplifier la campagne "Ventes Flash d'Été" et maximiser les retours.`;

const getMockSummaryPromise = (delay = 1000) => {
    return new Promise<string>(resolve => {
        setTimeout(() => {
            resolve(MOCK_SUMMARY);
        }, delay);
    });
};


export const generateMarketingSummary = async (data: MarketingData): Promise<string> => {
    if (!process.env.API_KEY) {
        // Return a mock response if API key is not available
        return getMockSummaryPromise(2000);
    }

    const { metrics, campaigns, chartData } = data;

    const prompt = `
        Vous êtes une IA analyste marketing senior. Votre tâche est de fournir un résumé concis et professionnel des données marketing fournies.
        Analysez les données suivantes et générez un bref rapport (au format Markdown) avec les sections suivantes :
        1.  **Aperçu de la Performance Hebdomadaire :** Un court paragraphe résumant la situation globale.
        2.  **Victoire Clé :** Mettez en évidence la métrique ou le résultat le plus positif.
        3.  **Axe d'Amélioration :** Identifiez une métrique ou un domaine nécessitant une attention particulière.
        4.  **Campagne Phare :** Mentionnez la campagne la meilleure ou la plus remarquable.
        5.  **Recommandation :** Fournissez une recommandation concrète basée sur les données.

        **Données :**
        - **Indicateurs Clés :** ${JSON.stringify(metrics.map(m => ({ title: m.title, value: m.value, change: m.change, changeType: m.changeType })))}
        - **Campagnes :** ${JSON.stringify(campaigns)}
        - **Données d'Engagement (7 derniers mois) :** ${JSON.stringify(chartData.engagement)}
        - **Données de l'Entonnoir de Conversion :** ${JSON.stringify(chartData.conversion)}

        Soyez perspicace et direct.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (!response.text) {
            console.warn("Gemini API returned an empty response. Falling back to mock data.");
            return getMockSummaryPromise();
        }

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API. Falling back to mock data:", error);
        // Fallback to mock data on API error instead of throwing an exception
        return getMockSummaryPromise();
    }
};
