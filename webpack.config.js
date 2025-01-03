const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before building
  },
  mode: 'production', // Mode can be 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.js$/, // Handle JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Handle image files
        type: 'asset/resource', // Use Webpack 5 asset modules
      },
    ],
  },
  plugins: [],
  devtool: 'source-map', // Optional: Enable source maps for debugging
};
