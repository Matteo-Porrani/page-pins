import { fileURLToPath, URL } from 'node:url'
import vuePlugin from "@vitejs/plugin-vue";

export default {
	plugins: [
		vuePlugin(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	
}
