
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载当前环境下的所有变量
  // Use (process as any).cwd() to resolve the current working directory for loadEnv
  // because TypeScript may not recognize the cwd method on the global process object in this context.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // 核心修复：将 Vercel 环境变量 API_KEY 映射到全局
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: true
    },
    server: {
      port: 3000
    }
  };
});
