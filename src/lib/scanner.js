export async function scanWebsite(rawUrl) {
  if (!rawUrl) {
    throw new Error('Vul een URL in.');
  }

  const seoScore = 90;
  const performanceScore = 20;

  return {
    url: rawUrl,
    seoScore,
    performanceScore,
    verdict: bepaalOordeel(seoScore, performanceScore),
  };
}

export function bepaalOordeel(seoScore, performanceScore) {
  const gemiddelde = (seoScore + performanceScore) / 2;

  if (gemiddelde >= 80) return 'goedgekeurd';
  if (gemiddelde >= 50) return 'verbeteringen';
  return 'afgekeurd';
}