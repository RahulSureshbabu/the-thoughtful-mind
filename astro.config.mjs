// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://your-github-username.github.io',
	base: '/the-thoughtful-mind',
	integrations: [sitemap()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'fr', 'de', 'pt', 'hi', 'ja', 'ar'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
