import path from 'node:path';
import { mergeConfig, defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import commonConfig from '../build-common-config/vite.config.mjs';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default mergeConfig(
  commonConfig,
  defineConfig({
    base: './',
    css: {
      postcss: {
        plugins: [tailwindcssNesting, tailwindcss],
      },
    },
    build: {
      sourcemap: true,
      lib: {
        entry: path.join(__dirname, '..', 'src', 'index.ts'),
        name: 'index',
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['react', 'react-dom', 'react/jsx-runtime', 'lodash'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
            'react-dom': 'ReactDom',
            'react/jsx-runtime': 'JsxRuntime',
          },
        },
      },
    },
    plugins: [
      react(),
      libInjectCss(),
      dts({ tsconfigPath: 'tsconfig.build.json' }),
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint src/',
          dev: {
            logLevel: ['error'],
          },
        },
      }),
      // stylelint has issue with checker now: https://github.com/fi3ework/vite-plugin-checker/issues/260
      // checker({
      //   stylelint: {
      //     lintCommand:
      //       'stylelint --config build-tools/.stylelint.config.js src/**/*.{scss,css}',
      //   },
      // }),
    ],
  }),
);
