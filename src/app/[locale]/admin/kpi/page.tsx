import type { Metadata } from "next";
import { KPIDashboardClient } from "@/components/admin/KPIDashboardClient";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "KPI Dashboard | Pawmeals Admin",
  robots: { index: false, follow: false },
};

export default async function KPIDashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <KPIDashboardClient locale={locale} />;
}
