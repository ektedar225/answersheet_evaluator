import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/User_interface_for_handwritten_answer_sheet_evaluation/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});