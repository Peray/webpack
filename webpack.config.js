
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader'],
				include: path.join(__dirname,'./src'),
            	exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
				include: path.join(__dirname,'./src'),
            	exclude: /node_modules/,
       //      	loader: {
       //  			loader: 'url-loader',
			    //     options: {
			    //         limit: 5 * 1024,// 图片大小 > limit 使用file-loader, 反之使用url-loader
			    //         outputPath: 'images/'// 指定打包后的图片位置
			    //     }
    			// }
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /\.(csv|tsv)$/,
				use: ['csv-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
	        title: 'index',                 // 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用
	        filename: 'index.html',          // 产出的文件名
			template: './src/index.html',   // 指定产出的模板
	        // chunks: ['index'],     // 在产出的HTML文件里引入哪些代码块
	        hash: true,                      // 名称是否哈希值
	        // minify: {                       // 对html文件进行压缩
	        //     removeAttributeQuotes: true // 移除双引号
	        // }
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
     	new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname,'dist'),
		host: 'localhost',
    	compress: true, //开发服务器是否启动gzip等压缩
    	port: 8080,       
		hot: true,
		inline: true, //打包后加入一个websocket客户端
		openPage: 'index.html'
	},
	optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500,  // 文件发生改变后多长时间后再重新编译
        poll:1000               //每秒询问的文件变更的次数
    }
}