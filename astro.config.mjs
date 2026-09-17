// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://RahulSureshbabu.github.io',
	base: '/the-thoughtful-mind',
	integrations: [sitemap()],
	i18n: {
		defaultLocale: 'pt',
		locales: ['pt', 'en', 'es', 'fr', 'de', 'hi', 'ja', 'ar'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
