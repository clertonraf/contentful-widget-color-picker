/* eslint-disable no-console, no-process-exit */

process.env.NODE_ENV = 'production';


const Bundler = require('parcel-bundler');
const urlLoader = require('parcel-plugin-url-loader');
const chalk = require('chalk');
const fs = require('fs');
const postHTML = require('posthtml');
const posthtmlInlineAssets = require('posthtml-inline-assets');
const htmlnano = require('htmlnano');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const argv = require('yargs')
  .default({
    build: '/docs',
    publicUrl: './',
    root: './',
    src: '/src',
  })
  .usage('Usage: $0 [options]')
  .example('$0 build.js --build=/docs/color-picker --root=../', 'creates a build on a given build folder according with the given root project')
  .describe('build', 'The out directory to put the build files in, defaults to dist')
  .alias('b', 'build')
  .describe('root', 'The project root directory')
  .alias('r', 'root')
  .help('h')
  .alias('h', 'help')
  .argv;

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const rootDir = resolveApp(argv.root);

const entry = rootDir + argv.src + '/index.html';

// Bundler options
const options = {
  outDir: `${rootDir}${argv.build}`, // The out directory to put the build files in, defaults to dist
  publicUrl: argv.publicUrl,
  outFile: 'index.html', // The name of the outputFile
  target: 'browser',
  watch: false, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: false, // Enabled or disables caching, defaults to true
  contentHash: true, // Include a content hash in the outputted filenames
  minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
  hmr: false, // Enable or disable HMR while watching
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: false // Disable auto install
};

const bundler = new Bundler(entry, options);

const run = async () => {
  try {
    await urlLoader(bundler);
    await bundler.bundle();
  } catch (e) {
    console.log();
    console.error(chalk.red(e.message));
    process.exit(1);
  }
};

run();
