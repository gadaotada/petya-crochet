import initTranslations from "@/app/i18n";

const i18nNamespaces = ["home"];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {t('hero_txt')}
    </main>
  );
}
