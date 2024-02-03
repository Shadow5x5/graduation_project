import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ngrok } from "vite-plugin-ngrok"; // Импортируйте плагин

export default defineConfig({
    plugins: [
        react(),
        ngrok({
            authtoken: "2VMFkrsUDaAdmAWXxD8BJWdqpbp_6H7aXAkZwRiinHovMdo94",
        }), 
    ],
});
