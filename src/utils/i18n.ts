import { LOCALES, type Locale } from './posts';

const DEFAULT_LOCALE: Locale = 'en';

/** Swaps the locale prefix of a pathname (as produced by Astro's i18n routing) for a different locale. */
export function localizePath(pathname: string, base: string, targetLocale: Locale): string {
	let path = pathname;
	if (base && path.startsWith(base)) {
		path = path.slice(base.length);
	}
	path = '/' + path.replace(/^\/+/, '');

	const segments = path.split('/').filter(Boolean);
	if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
		segments.shift();
	}

	const rest = segments.join('/');
	const localePrefix = targetLocale === DEFAULT_LOCALE ? '' : `/${targetLocale}`;
	const withBase = `${base}${localePrefix}/${rest}`.replace(/\/+$/, '') || `${base}${localePrefix}` || '/';
	return withBase.replace(/([^:])\/\//g, '$1/');
}

export function matchBrowserLocale(browserLanguages: readonly string[]): Locale | null {
	for (const lang of browserLanguages) {
		const short = lang.slice(0, 2).toLowerCase();
		const match = LOCALES.find((l) => l === short);
		if (match) return match;
	}
	return null;
}
