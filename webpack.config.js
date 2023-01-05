const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const commonConfig = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  target: 'web',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new Dotenv(),
  ],
};

const developmentConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: '3010',
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
};

const productionConfig = {
  mode: 'production',
  devtool: 'none',
  output: {
    filenmae: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
  },
};

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
