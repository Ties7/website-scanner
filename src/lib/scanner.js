function normalizeUrl(rawUrl) {
  const trimmed = rawUrl.trim();
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

async function haalPaginaHtml(url) {
  const response = await fetch(url);
  const html = await response.text();
  const seoDetails = haalSeoDetails(html);
  return seoDetails;
}

function haalSeoDetails(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)];

  return {
    title: titleMatch ? titleMatch[1] : 'geen titel gevonden',
    description: descriptionMatch ? descriptionMatch[1] : 'geen meta-description gevonden',
    h1s: h1Matches.map((match) => match[1]),
  };
}

export async function scanWebsite(rawUrl) {
  if (!rawUrl) {
    throw new Error('Vul een URL in.');
  }

  const url = normalizeUrl(rawUrl);
  const seoDetails = await haalPaginaHtml(url);
  const apiKey = import.meta.env.PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=performance&category=seo`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const performanceScore = Math.round(data.lighthouseResult.categories.performance.score * 100);
  const seoScore = Math.round(data.lighthouseResult.categories.seo.score * 100);

    const aiReview = await genereerAiReview(url, seoScore, performanceScore, seoDetails);

    return {
    url,
    seoScore,
    performanceScore,
    verdict: bepaalOordeel(seoScore, performanceScore),
    eindoordeelToelichting: 'placeholder',
    aiReview,
    };
}

export function bepaalOordeel(seoScore, performanceScore) {
  const gemiddelde = (seoScore + performanceScore) / 2;

  if (gemiddelde >= 80) return 'goedgekeurd';
  if (gemiddelde >= 50) return 'verbeteringen';
  return 'afgekeurd';
}

async function genereerAiReview(url, seoScore, performanceScore, seoDetails) {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Je bent een expert in horeca-websites. Analyseer deze website:

URL: ${url}
SEO-score: ${seoScore}/100
Performance-score: ${performanceScore}/100
Paginatitel: ${seoDetails.title}
Meta-description: ${seoDetails.description}
H1-koppen: ${seoDetails.h1s.join(', ') || 'geen gevonden'}

Antwoord ALLEEN met geldige JSON, in exact dit formaat, zonder markdown-codeblokken eromheen:

{
  "samenvatting": "een korte samenvatting van 2-3 zinnen",
  "verbeterpunten": [
    { "tekst": "concreet verbeterpunt", "urgentie": "hoog" }
  ]
}

urgentie moet altijd "hoog", "gemiddeld", of "laag" zijn. Geef 2 tot 4 verbeterpunten.`,
        },
      ],
    }),
  });

    const data = await response.json();
    const textBlock = data.content.find((block) => block.type === 'text');
    let tekstAntwoord = textBlock.text;

    // Verwijder eventuele markdown-codeblok-opmaak die Claude soms toch toevoegt
    tekstAntwoord = tekstAntwoord.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(tekstAntwoord);
}