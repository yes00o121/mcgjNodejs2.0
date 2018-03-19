var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      { test: /\.(eot|woff|ttf)$/, loader: 'file-loader' },
      {
        test: /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.vue$/,
        loader: 'vue'
      },
      {
        test: /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
          test: /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.css$/,
          loader: "style!css"
      },
      {
        test: /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\?]?.*)$/,
        loader: "file"
      },
      {
        test: /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
    rules: [
      { test: /\.(eot|woff|ttf)$/, loader: 'file-loader' },
      {
          test: /\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\?]?.*)$/,
          loader: "file"
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
