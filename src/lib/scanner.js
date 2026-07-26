export async function scanWebsite(rawUrl) {
  if (!rawUrl) {
    throw new Error('Vul een URL in.');
  }

  const seoScore = 80;
  const performanceScore = 63;

    return {
    url: rawUrl,
    seoScore,
    performanceScore,
    verdict: bepaalOordeel(seoScore, performanceScore),
    eindoordeelToelichting: 'Sterke basis, met enkele verbeteringen haal je nog meer uit je website.',
    aiReview: {
        samenvatting: 'De website maakt een warme en professionele indruk en sluit goed aan bij de sfeer van het restaurant.',
        verbeterpunten: [
        { tekst: 'Optimaliseer de laadtijd van afbeeldingen.', urgentie: 'hoog' },
        { tekst: 'Voeg unieke meta titels toe voor alle pagina\'s.', urgentie: 'gemiddeld' },
        ],
    },
    };
}

export function bepaalOordeel(seoScore, performanceScore) {
  const gemiddelde = (seoScore + performanceScore) / 2;

  if (gemiddelde >= 80) return 'goedgekeurd';
  if (gemiddelde >= 50) return 'verbeteringen';
  return 'afgekeurd';
}