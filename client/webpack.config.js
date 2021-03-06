const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const {
  InjectManifest
} = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'tmte',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Mex Text Editor',
        short_name: 'TMTE',
        description: 'Write down your food inspired thoughts with Text Mex Text Editor.',
        background_color: '#aa0e20',
        theme_color: '#017d2b',
        start_url: '/',
        publicPath: '/',
        icons: [{
          src: path.resolve('src/images/tmteLogo.png'),
          sizes: [96, 128, 192, 256],
          destination: path.join('assets', 'icons'),
        }, ],
      }),
    ],

    module: {
      rules: [{
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"
              ]
            },
          },
        },
      ],
    },
  };
};