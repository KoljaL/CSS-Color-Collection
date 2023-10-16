import adapter from '@sveltejs/adapter-static';
let dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: dev ? '' : '/CSS-Color-Collection'
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: null
		})
	}
};

export default config;
