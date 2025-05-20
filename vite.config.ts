import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/answersheet_evaluator/', // <-- Update to match your new repo name
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});