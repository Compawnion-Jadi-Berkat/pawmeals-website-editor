"use client";

// Next.js 16 requires a global-error.tsx at the app root for the global error boundary.
// This must be a Client Component but must NOT call any hooks during SSR prerendering.
// Keep this minimal — all real error UI is handled by [locale]/error.tsx.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "4rem",
          background: "#F5EDE0",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <h1 style={{ color: "#C85C5C", fontSize: "3rem", marginBottom: "1rem" }}>
          Oops!
        </h1>
        <p style={{ color: "#3D2C2C", marginBottom: "2rem" }}>
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#C85C5C",
            color: "#fff",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
