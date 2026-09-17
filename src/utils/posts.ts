import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export const LOCALES = ['pt', 'en', 'es', 'fr', 'de', 'hi', 'ja', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

/** Source language: Portuguese (Portugal). Every other locale is machine-translated from it. */
export const SOURCE_LOCALE: Locale = 'pt';

export const LOCALE_LABELS: Record<Locale, string> = {
	pt: 'Português',
	en: 'English',
	es: 'Español',
	fr: 'Français',
	de: 'Deutsch',
	hi: 'हिन्दी',
	ja: '日本語',
	ar: 'العربية',
};

/** BCP-47 tags for Intl formatting (e.g. toLocaleDateString). `pt` is explicitly `pt-PT` — bare
 *  "pt" resolves to Brazilian conventions in some Intl implementations, which is wrong here. */
export const INTL_TAG: Record<Locale, string> = {
	pt: 'pt-PT',
	en: 'en',
	es: 'es',
	fr: 'fr',
	de: 'de',
	hi: 'hi',
	ja: 'ja',
	ar: 'ar',
};

export function postLocale(entry: PostEntry): Locale {
	return entry.id.split('/')[0] as Locale;
}

export function postSlug(entry: PostEntry): string {
	return entry.id.split('/').slice(1).join('/');
}

export async function getPublishedPosts(locale: Locale): Promise<PostEntry[]> {
	const posts = await getCollection('posts', (entry) => postLocale(entry) === locale && !entry.data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<PostEntry | undefined> {
	const posts = await getCollection('posts', (entry) => postLocale(entry) === locale && postSlug(entry) === slug);
	return posts[0];
}

export async function getAvailableLocalesForSlug(slug: string): Promise<Locale[]> {
	const posts = await getCollection('posts', (entry) => postSlug(entry) === slug && !entry.data.draft);
	return posts.map(postLocale);
}

export async function getAllTags(locale: Locale): Promise<string[]> {
	const posts = await getPublishedPosts(locale);
	const tags = new Set<string>();
	for (const post of posts) {
		for (const tag of post.data.tags) tags.add(tag);
	}
	return [...tags].sort();
}

export async function getPostsByTag(locale: Locale, tag: string): Promise<PostEntry[]> {
	const posts = await getPublishedPosts(locale);
	return posts.filter((p) => p.data.tags.includes(tag));
}

export async function getRelatedPosts(locale: Locale, current: PostEntry, max = 3): Promise<PostEntry[]> {
	const posts = await getPublishedPosts(locale);
	const currentSlug = postSlug(current);
	const currentTags = new Set(current.data.tags);
	return posts
		.filter((p) => postSlug(p) !== currentSlug)
		.filter((p) => p.data.tags.some((t) => currentTags.has(t)))
		.slice(0, max);
}
