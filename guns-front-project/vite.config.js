import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import ViteCompression from 'vite-plugin-compression';
import ViteComponents from 'unplugin-vue-components/vite';
import { VxeTableResolve } from 'vite-plugin-style-import';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { DynamicAntdLess } from './src/utils/dynamic-theme';
import { styleDeps } from './src/utils/resolvers';

export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build';
  const env = loadEnv(mode, process.cwd());
  // 在这里增加 base 写子路径，注意这里前后都要有斜杠
  return {
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 9000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // 组件按需引入
      ViteComponents({
        dts: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          }),
          VxeTableResolve({
            importStyle: true
          })
        ]
      }),
      // gzip 压缩
      ViteCompression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // 兼容低版本浏览器
      legacy({
        targets: ['Chrome 63'],
        modernPolyfills: true
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          plugins: [new DynamicAntdLess()]
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    optimizeDeps: {
      include: [
        ...styleDeps,
        'lodash-es',
        'cropperjs',
        'tinymce/tinymce',
        'ant-design-vue',
        'ant-design-vue/es',
        '@ant-design/icons-vue',
        'vuedraggable',
        'dayjs',
        'echarts/core',
        'echarts/charts',
        'echarts/renderers',
        'echarts/components',
        'vue-echarts',
        'xlsx'
      ]
    },
    esbuild: {
      charset: 'ascii'
    },
    build: {
      target: 'chrome63'
    }
  };
});
