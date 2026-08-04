export const siteMetadata = {
  title: 'Nislen Café QR Menu',
  description:
    'A polished QR menu and restaurant management experience for cafés with table service, reservations, and guest feedback.',
  url: 'https://nislen.cafe',
  image: 'https://nislen.cafe/og-image.png',
  organization: 'Nislen Café'
}

export function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Nislen Café',
    url: siteMetadata.url,
    image: siteMetadata.image,
    description: siteMetadata.description,
    telephone: '+90 212 555 01 01',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Beyoğlu',
      addressLocality: 'Istanbul',
      addressCountry: 'TR'
    },
    servesCuisine: ['Cafe', 'Coffee', 'Bakery'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '08:00',
        closes: '23:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '23:00'
      }
    ],
    menu: `${siteMetadata.url}/` 
  }
}
