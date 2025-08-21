const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    scripts: './app/js/scripts.js',      // your JS
    style:   './app/scss/main.scss',     // SCSS as its own entry
  },
  output: {
    filename: '[name].js',               // dist/scripts.js
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2, url: false } },
          { loader: 'postcss-loader', options: { sourceMap: true, postcssOptions: { plugins: [require('autoprefixer')] } } },
          { loader: 'sass-loader', options: { sourceMap: true, implementation: require('sass') } },
        ],
      },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource', generator: { filename: 'img/[name][ext]' } },
      { test: /\.(woff2?|ttf|otf|eot)$/i, type: 'asset/resource', generator: { filename: 'font/[name][ext]' } },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }), // dist/style.css
  ],
  resolve: { extensions: ['.js', '.scss', '.css'] },
};
