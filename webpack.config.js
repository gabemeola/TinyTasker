const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const PORT = process.env.PORT || 3333;
const ADDRESS = '0.0.0.0';

let isHttps = false;
const prefix = isHttps ? 'https:' : 'http:';

module.exports = {
	resolve: {
		modules: [ // Allow Easy non-relative imports
			path.resolve("./src"),
			'node_modules'
		],
		extensions: [".js", '.jsx', '.ts', '.tsx'], // Resolves Imports
	},
	entry: { // Entry Point for Webpack
		bundle: [
			`webpack-dev-server/client?${prefix}//${ADDRESS}:${PORT}`,
			'webpack/hot/dev-server',
			'./src/app.ts', // Main App JS File
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].js",
		publicPath: `${prefix}//${ADDRESS}:${PORT}/` // Bundled Javascript Webpack Spits out.
	},
	devtool: 'eval-cheap-module-source-map',
	devServer: { // Allows webpack-dev-server to be live reloaded
		 contentBase: './src',
		 //hot: true,
		 //inline: true,
		 compress: false,
		 port: PORT,
		 host: ADDRESS,
		 https: isHttps
	},
	module: {
		rules: [
			{ // Babel loader for converting ES2015 to ES5
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
			},
			{ // Loads the font files from imports
				test:  /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=./assets/fonts/[name].[ext]'
			},
			{ // Support Font-Awesome Versioning
				test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader?name=./assets/fonts/[name].[ext]"
			},
			{ // Optimizes Images
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=./assets/min-imgs/[name].[ext]',
				]
			},
			{ // Loads HTML imports/requires
				test: /\.html$/,
				loader: 'html-loader',
				exclude: path.join(__dirname, 'src', 'index.html')
			}
		]
	},
	plugins: [
		// Fixes some compat issues with webpack and typescript error handling
		new CheckerPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				// Context for Older Loaders
				context: path.join(__dirname, 'src'),
				output: {
					path: path.join(__dirname, 'dist')
				}
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development') // Sets node process to "development"
			},
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(), // Hot reloading
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			filename: "index.html",
			inject: "body",
		}),
	]
};