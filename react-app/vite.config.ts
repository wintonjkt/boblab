import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Base path for deployment (configurable via environment variable)
    base: env.VITE_BASE_PATH || '/',
    
    plugins: [react()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME || 'Bob Lab'),
    },
    
    build: {
      outDir: 'dist',
      // Enable source maps only if explicitly set
      sourcemap: env.VITE_SOURCEMAP === 'true',
      // Use esbuild for faster builds
      minify: 'esbuild',
      // Target modern browsers for better optimization
      target: 'es2020',
      // Optimize CSS
      cssMinify: true,
      // Rollup options for code splitting
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // React core libraries
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              // Carbon Design System
              if (id.includes('@carbon/react')) {
                return 'carbon';
              }
              // Internationalization
              if (id.includes('i18next')) {
                return 'i18n';
              }
              // Mermaid diagrams
              if (id.includes('mermaid')) {
                return 'mermaid';
              }
              // Other vendor libraries
              return 'vendor';
            }
          },
          // Asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.');
            const ext = info?.[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(ext || '')) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      // Chunk size warning limit (in KB)
      chunkSizeWarningLimit: 1000,
      // Report compressed size
      reportCompressedSize: true,
      // Optimize dependencies
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
    
    // Development server configuration
    server: {
      port: 3000,
      open: true,
      // Enable CORS for development
      cors: true,
      // Proxy configuration (if needed for API calls)
      proxy: env.VITE_API_BASE_URL ? {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      } : undefined,
    },
    
    // Preview server configuration
    preview: {
      port: 4173,
      open: true,
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@carbon/react',
        'i18next',
        'react-i18next',
      ],
      exclude: ['mermaid'],
    },
    
    // Environment variable prefix
    envPrefix: 'VITE_',
  };
});

// Made with Bob
