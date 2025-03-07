import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({
  title = "Top Password Generator - Create Strong & Secure Passwords",
  description = "Generate strong, secure, and unique passwords instantly. Choose from random passwords, memorable phrases, or PIN numbers. Free online password generator tool.",
  keywords = "password generator, strong password, secure password, random password, PIN generator, memorable password",
  ogImage = "/og-image.png"
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toppasswordgenerator.com';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title,
          "description": description,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </Head>
  );
}
