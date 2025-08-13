// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './app/js/scripts.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
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
                // if you need global include paths, add them here
                // includePaths: [path.resolve(__dirname, 'app/scss')],
              },
            },
          },
        ],
      },
      // If you reference images/fonts in your SCSS, keep this handy:
      { test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/, type: 'asset' },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
  resolve: { extensions: ['.js', '.scss', '.css'] },
};
