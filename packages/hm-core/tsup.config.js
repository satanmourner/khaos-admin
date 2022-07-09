import { defineConfig } from 'tsup';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import postcss from 'esbuild-postcss';

export default defineConfig({
  entry: ['src/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      transform: postcssModules({}),
    }),
    postcss(),
  ],
});
