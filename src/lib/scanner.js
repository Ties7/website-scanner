function normalizeUrl(rawUrl) {
  const trimmed = rawUrl.trim();
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

export async function scanWebsite(rawUrl) {
  if (!rawUrl) {
    throw new Error('Vul een URL in.');
  }

  const url = normalizeUrl(rawUrl);
  const apiKey = import.meta.env.PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=performance&category=seo`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const performanceScore = Math.round(data.lighthouseResult.categories.performance.score * 100);
  const seoScore = Math.round(data.lighthouseResult.categories.seo.score * 100);

  return {
    url,
    seoScore,
    performanceScore,
    verdict: bepaalOordeel(seoScore, performanceScore),
    eindoordeelToelichting: 'placeholder',
    aiReview: {
      samenvatting: 'placeholder',
      verbeterpunten: [],
    },
  };
}

export function bepaalOordeel(seoScore, performanceScore) {
  const gemiddelde = (seoScore + performanceScore) / 2;

  if (gemiddelde >= 80) return 'goedgekeurd';
  if (gemiddelde >= 50) return 'verbeteringen';
  return 'afgekeurd';
}