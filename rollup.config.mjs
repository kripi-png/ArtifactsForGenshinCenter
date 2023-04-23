import zip from 'rollup-plugin-zip';
import del from 'rollup-plugin-delete';
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';

// dev build if watching, prod build if not
const production = !process.env.ROLLUP_WATCH;

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
    production && zip(),
  ],
}
