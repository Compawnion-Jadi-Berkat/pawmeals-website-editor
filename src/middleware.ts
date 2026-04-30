import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  // Redirect / to /id by default
});

export const config = {
  matcher: [
    // Match all pathnames except:
    // - _next (Next.js internals)
    // - api routes
    // - static files (images, fonts, etc.)
    "/((?!_next|api|.*\\..*).*)",
  ],
};
