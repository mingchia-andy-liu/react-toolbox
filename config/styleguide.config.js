const ROOT_DIR = process.cwd()
const path = require('path')
const webpackConfig = require('./webpack.config.base.js')
const version = require('../package.json').version;

module.exports = {
    title: `React Toolbox v${version}`,
    serverPort: 4000,
    require: [
        path.resolve(ROOT_DIR, 'src/styles/styles.scss'),
    ],
    webpackConfig: webpackConfig,
    skipComponentsWithoutExample: false,
    previewDelay: 500,
    components: path.resolve(ROOT_DIR, 'src/@(components|Components)/**/*.{js,jsx}')
}
