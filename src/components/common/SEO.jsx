import React from "react";
import { Helmet } from "react-helmet-async";
import { profile } from "../../data/portfolio";

export function SEO({ 
  title, 
  description = profile.summary, 
  image = "/preview.png", 
  slug = "" 
}) {
  const siteTitle = `${title} | ${profile.name}`;
  const siteUrl = window.location.origin;
  const canonicalUrl = `${siteUrl}${slug}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
