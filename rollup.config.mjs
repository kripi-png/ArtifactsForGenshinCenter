import zip from 'rollup-plugin-zip';
import del from 'rollup-plugin-delete';
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';

export default {
  input: 'manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    del({ targets: 'dist/*' }),
    chromeExtension(),
    simpleReloader(),
    zip(),
  ],
}
