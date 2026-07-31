export default {
  name: 'scan',
  title: 'Scan',
  type: 'document',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'seoScore',
      title: 'SEO-score',
      type: 'number',
    },
    {
      name: 'performanceScore',
      title: 'Performance-score',
      type: 'number',
    },
    {
      name: 'verdict',
      title: 'Eindoordeel',
      type: 'string',
    },
    {
      name: 'eindoordeelToelichting',
      title: 'Toelichting eindoordeel',
      type: 'text',
    },
    {
      name: 'aiSamenvatting',
      title: 'AI-samenvatting',
      type: 'text',
    },
    {
      name: 'verbeterpunten',
      title: 'Verbeterpunten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tekst', title: 'Tekst', type: 'string' },
            {
              name: 'urgentie',
              title: 'Urgentie',
              type: 'string',
              options: {
                list: ['hoog', 'gemiddeld', 'laag'],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'gescandOp',
      title: 'Gescand op',
      type: 'datetime',
    },
  ],
};