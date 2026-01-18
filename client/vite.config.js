import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react({
      // Fast Refresh optimizasyonu
      fastRefresh: true,
      // Babel optimizasyonları
      babel: {
        plugins: [
          // Remove console.log in production
          process.env.NODE_ENV === 'production' && 'transform-remove-console'
        ].filter(Boolean)
      }
    }),
    
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb üzeri dosyalar sıkıştırılacak
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    }),
    
    // Brotli compression - Daha iyi sıkıştırma
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false
    }),
    
    // PWA Support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Güneş Hotel - Nemrut Dağı',
        short_name: 'Güneş Hotel',
        description: 'UNESCO Dünya Mirası Nemrut Dağı\'na en yakın otel',
        theme_color: '#c18c30',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Runtime caching strategies
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    }),
    
    // Bundle analyzer - production build sonrası görselleştirme
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // sunburst, treemap, network
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@data': path.resolve(__dirname, './src/data'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    },
    // React'in tek instance olarak kullanılmasını garanti et
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap']
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      'react-helmet-async',
      'react-i18next',
      'i18next',
      'i18next-browser-languagedetector'
    ],
    force: true
  },
  
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  preview: {
    port: 4173,
    host: true,
    open: true
  },
  
  build: {
    outDir: 'build',
    sourcemap: false, // Production'da sourcemap kapalı
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // console.log'ları kaldır
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // İki geçişli optimizasyon
        ecma: 2020
      },
      format: {
        comments: false // Yorumları kaldır
      },
      mangle: {
        safari10: true
      }
    },
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manuel chunk splitting - Core Web Vitals için optimize
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('bootstrap') || id.includes('react-bootstrap')) {
              return 'bootstrap'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n'
            }
            if (id.includes('aos') || id.includes('axios')) {
              return 'utils'
            }
            return 'vendor'
          }
        },
        
        // Asset isimlendirme
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop()
          
          // Görseller
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`
          }
          
          // Fontlar
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          
          // CSS
          if (extType === 'css') {
            return `assets/css/[name]-[hash][extname]`
          }
          
          return `assets/[name]-[hash][extname]`
        },
        
        // JavaScript chunk isimlendirme
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Reporting
    reportCompressedSize: false, // Build hızını artırmak için
    
    // CSS options
    cssMinify: true,
    
    // Asset inline limit
    assetsInlineLimit: 4096 // 4KB altı assetler inline olacak
  },
  
  // Esbuild optimizasyonları
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})