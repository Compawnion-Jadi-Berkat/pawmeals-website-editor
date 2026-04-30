// Root not-found.tsx — completely isolated, no context dependencies.
// Renders outside [locale]/layout.tsx so must NOT use CartProvider, next-intl, or any context.
// Must include its own <html>/<body> since root layout is a passthrough.
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — Pawmeals</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: sans-serif;
            background: #F5EDE0;
            color: #3D2C2C;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 2rem;
          }
          h1 { font-size: 5rem; color: #C85C5C; line-height: 1; font-weight: 800; }
          p { font-size: 1.125rem; margin-top: 1rem; }
          a {
            display: inline-block;
            margin-top: 2rem;
            padding: 0.75rem 2rem;
            background: #C85C5C;
            color: #fff;
            border-radius: 9999px;
            text-decoration: none;
            font-weight: 700;
          }
        `}</style>
      </head>
      <body>
        <div>
          <div style={{ fontSize: "3rem" }}>🐾</div>
          <h1>404</h1>
          <p>Halaman tidak ditemukan / Page not found</p>
          <a href="/id">Kembali ke Beranda</a>
        </div>
      </body>
    </html>
  );
}
