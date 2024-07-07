import { headers } from "next/headers";

import { saveRequestHeaders } from "@/services/analytics/main";
import { Login } from "./_components/Login";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/libs/providers/TranslationProvider";
import LanguageChanger from "@/components/LanguageChanger";

const i18nNamespaces = ["login"]

export default async function ControlPage({ params: { locale } }: { params: { locale: string } }) {
    const { resources } = await initTranslations(locale, i18nNamespaces);

    const headersList = headers();
    await saveRequestHeaders(headersList, `${locale}/control/login`);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <Login />
            <LanguageChanger />
        </TranslationsProvider>
    );
}