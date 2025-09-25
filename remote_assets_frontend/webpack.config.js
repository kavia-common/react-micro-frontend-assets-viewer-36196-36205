const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const APP_NAME = 'assets';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src', 'index.js'),

  // Keep a single runtime for the remote build. Some hosts expect the remote's
  // runtime inside remoteEntry, and eager runtime splitting can complicate loading.
  // We explicitly disable runtimeChunk here to keep MF lazy-sharing behavior predictable.
  optimization: {
    runtimeChunk: false,
  },

  output: {
    publicPath: PUBLIC_PATH,
    filename: '[name].[contenthash].js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'static/media/[name][hash][ext][query]',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
      watch: true,
    },
    port: process.env.PORT || 3001,
    historyApiFallback: true,
    hot: true,
    // Allow requests from any host to avoid "Invalid Host header" in preview/proxy environments.
    // See: https://webpack.js.org/configuration/dev-server/#devserverallowedhosts
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      // JS/JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Images (optional in case we import other images)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
      },
      // Fonts
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: APP_NAME,
      filename: 'remoteEntry.js',
      exposes: {
        './AssetRegistry': './src/mf/assetRegistry.js',
        './CalendarGifViewer': './src/mf/CalendarGifViewer.jsx',
      },
      // React sharing must be singleton and non-eager to avoid:
      // "Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react"
      // The host must also declare the same shape (singleton + non-eager) and init share scope before loading remotes.
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      publicPath: PUBLIC_PATH,
    }),
  ],
};
