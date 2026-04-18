import Script from "next/script";

const INLINE =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});";

export function ConsentModeDefaultScript() {
  return (
    <Script
      id="consent-mode-default-v2"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: INLINE }}
    />
  );
}
