import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// optimizeDeps: {
	//   exclude: ['lucide-react'],
	// },
	server: {
		allowedHosts: ["44102d54b189.ngrok-free.app "],
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
