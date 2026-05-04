/**
 * Embedded Sanity Studio — served at /studio
 *
 * Sanity Studio v5 uses React 19 hooks (useEffectEvent) that are not available
 * in the server bundle. We must lazy-load BOTH NextStudio AND sanity.config
 * inside the same dynamic import so that neither ever touches the SSR bundle.
 *
 * Access: https://your-domain.com/studio
 * Auth: Sanity OAuth (must have access to project lr00lxe1)
 */
"use client";

import dynamic from "next/dynamic";

// Lazy wrapper that imports both config and Studio together — fully client-only
const StudioWithConfig = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import("next-sanity/studio"),
      import("../../../../sanity.config"),
    ]);
    // Return a component that closes over both
    function Studio() {
      return <NextStudio config={config} />;
    }
    return Studio;
  },
  {
    ssr: false,
    loading: () => <StudioLoader />,
  }
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
  return <StudioWithConfig />;
}
