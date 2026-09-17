import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';
import { getPublishedPosts, postSlug } from '../utils/posts';

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts('en');
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site ?? SITE.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `${base}/posts/${postSlug(post)}/`,
		})),
	});
}
