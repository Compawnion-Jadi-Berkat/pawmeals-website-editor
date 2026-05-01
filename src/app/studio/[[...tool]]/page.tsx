/**
 * Embedded Sanity Studio — served at /studio
 *
 * Sanity Studio is a pure client-side SPA. It must NOT be server-rendered.
 * We use next/dynamic with ssr:false to ensure it only runs in the browser.
 *
 * Access: https://your-domain.com/studio
 * Auth: Sanity OAuth (must have access to project lr00lxe1)
 */
"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

// Dynamically import NextStudio with SSR disabled — Studio is browser-only
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false, loading: () => <StudioLoader /> }
);

function StudioLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#101112",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
        gap: "12px",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading Pawmeals Studio…
    </div>
  );
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
