module.exports = {
  module: {
    loaders: [
    ]
  },
  entry: {
    app: './src/app.js',
  },
  output: {
    path: 'bundles/',
    filename: "[name].bundle.js",
  },
  devtool: '#source-map', // way faster than inline-source-map during page load
};