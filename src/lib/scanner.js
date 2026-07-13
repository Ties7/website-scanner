export async function scanWebsite(rawUrl) {
  if (!rawUrl) {
    throw new Error('Vul een URL in.');
  }

  const seoScore = 78;
  const performanceScore = 63;

  return {
    url: rawUrl,
    seoScore,
    performanceScore,
  };
}