const helpers = require('./webpack/helpers');

const isProd = process.argv.indexOf('-p') !== -1;
let filename;
if (isProd) {
    filename = '[name].min.js';
} else {
    filename = '[name].js';
}

module.exports = {
    entry: {
        'number-to-bangla': './src/number-to-bangla.js'
    },
    output: {
        path: helpers.root('dist'),
        filename: filename,
        library: 'NumToBangla',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: [
                    helpers.root('node_modules')
                ],
                test: /\.js$/,
                query: {
                    plugins: [
                        'transform-runtime'
                    ],
                    presets: [["es2015", { "modules": false }]]
                }
            }
        ]
    },
    plugins: []
};
