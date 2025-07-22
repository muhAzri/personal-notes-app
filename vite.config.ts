import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@core': path.resolve(__dirname, './src/core'),
			'@features': path.resolve(__dirname, './src/features'),
			'@infrastructure': path.resolve(__dirname, './src/infrastructure'),
		},
	},
})
