import fetch from "node-fetch";

/**
 * Cloudflare Utility Service
 * Handles CDN cache purging via Cloudflare API v4
 */

const CF_API_URL = "https://api.cloudflare.com/client/v4";

export const purgeCache = async () => {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!token || !zoneId) {
    console.warn("Cloudflare credentials missing. Skipping cache purge.");
    return;
  }

  try {
    const response = await fetch(`${CF_API_URL}/zones/${zoneId}/purge_cache`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ purge_everything: true })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log("Cloudflare Cache Purged Successfully.");
    } else {
      console.error("Cloudflare Cache Purge Failed:", data.errors);
    }
  } catch (error) {
    console.error("Cloudflare API Error:", error);
  }
};
