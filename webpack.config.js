const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './app/js/scripts.js',                 // JS imports SCSS
  output: {
    filename: 'scripts.js',                     // dist/scripts.js
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'source-map',
  stats: { errorDetails: true },
  // bail: true, // uncomment while debugging to stop at the first error
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,      // make sure postcss + sass run first
              url: false,            // avoid resolving url(...) like your icon vars
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: { plugins: [require('autoprefixer')] },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'app/scss')],
              },
              additionalData: `@use "sass:color";\n@use "sass:math";\n`,
            },
          },
        ],
      },
      // images → dist/img/
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'img/[name][ext]' },
      },
      // fonts → dist/font/
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: 'asset/resource',
        generator: { filename: 'font/[name][ext]' },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',                        // dist/style.css
    }),
  ],
  resolve: { extensions: ['.js', '.scss', '.css'] },
};
