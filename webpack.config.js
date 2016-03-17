const webpack = require('webpack');
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css?modules', 'postcss'],
                include: PATHS.app
            }
        ]
    },
    postcss: function () {
        return [
            require('autoprefixer'),
            require('postcss-vmin')
        ];
    },
    devServer: {
        contentBase: PATHS.build,
        hot: true,
        inline: true,
        progress: true,
        port: process.env.PORT || 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
