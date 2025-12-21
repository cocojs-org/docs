const path = require('node:path');
const process = require('node:process');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    webpack: {
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{ from: path.resolve(process.cwd(), 'public') }],
            }),
        ],
    },
};

module.exports = config;
