import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export const LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'hi', 'ja', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
	fr: 'Français',
	de: 'Deutsch',
	pt: 'Português',
	hi: 'हिन्दी',
	ja: '日本語',
	ar: 'العربية',
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
