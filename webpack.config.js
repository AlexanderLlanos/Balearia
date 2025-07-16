const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const indexOutput = './index.html'
const indextInput = './src/components/templates/home/home.html'

let htmlTemplates = [
  'home',
]

let multipleFiles = htmlTemplates.map(name => {
  return new HTMLWebpackPlugin({
    filename: './' + name + '.html',
    template: './src/components/templates/'+name+'/' + name + '.html'
  })
})

const webpackInitConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
					'sass-loader'
        ]
			},
			{
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: 'assets/fonts',
              publicPath: '../assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: 'assets/images',
              publicPath: 'assets/images'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCSSExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css'
    }),
	].concat(multipleFiles)
}

module.exports = webpackInitConfig
