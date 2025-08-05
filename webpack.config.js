const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './app/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js',
    clean: true,
  },
  module: {
    rules: [
      // JS Loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // SCSS + Autoprefixing
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // autoprefixer step
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass') // use Dart Sass
            }
          }
        ],
      },
      // Fonts and other assets
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
  mode: 'development',
  devtool: 'source-map',
};
