const path = require('path');

module.exports = {
  mode:    'production',
  entry:   {
    'ts-react-redux-store':     path.resolve(__dirname, 'src/index.ts'),
    'ts-react-redux-store.min': path.resolve(__dirname, 'src/index.ts'),
  },
  output:  {
    path:           path.resolve(__dirname, '_bundles'),
    filename:       '[name].js',
    library:        'TSReactReduxStore',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  module:  {
    rules: [
      {
        test:    /\.tsx?$/,
        loader:  'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};