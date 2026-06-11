import { Html, Head, Main, NextScript } from "next/document";
// Required by Next.js App Router projects that still generate internal Pages Router pages (/_error, /404).
// This file prevents the "Html should not be imported outside of pages/_document" build error.
export default function Document() {
  return (
    <Html lang="id">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
