var webpack = require('webpack');
var path = require('path');
var ROOT_DIR = process.cwd();

var entryPath = path.resolve(ROOT_DIR, 'src/app.jsx');
var outputPath = path.resolve(ROOT_DIR, 'build')

var config = {
    entry: [
        entryPath
    ],
    output: {
        filename: '[name].js',
        path: outputPath
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

module.exports = config;
