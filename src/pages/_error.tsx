import type { NextPageContext } from "next";

// Minimal Pages Router error page — required for Next.js internal error handling.
// All real 404/error UI is handled by app/not-found.tsx and app/[locale]/error.tsx.
function Error({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem", background: "#F5EDE0", minHeight: "100vh" }}>
      <h1 style={{ color: "#C85C5C", fontSize: "4rem" }}>{statusCode}</h1>
      <p style={{ color: "#3D2C2C" }}>
        {statusCode === 404 ? "Halaman tidak ditemukan" : "Terjadi kesalahan"}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as { statusCode?: number }).statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;
