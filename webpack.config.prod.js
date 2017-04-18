const path = require("path");
const fs = require('fs');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

/* Extract Text Plugin Files */
const externalCSS = new ExtractTextPlugin('main.[chunkHash].css');

module.exports = {
	resolve: {
		modules: [ // Allow Easy non-relative imports
			path.resolve("./src"),
			'node_modules'
		],
		extensions: [".js", '.jsx', '.ts', '.tsx'], // Resolves Imports
	},
	entry: { //Entry Point for Webpack
		bundle: [
			'./src/index.ts', // Main App JS File
			'./src/styles/index.scss', // Main Page Styles
		],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].[chunkHash].js", // Bundled Javascript Webpack Spits out. Hashed for cache busting
		chunkFilename: "[name].[chunkHash].js",
		publicPath: './'
	},
	module: {
		rules: [
			{ // Typescript Loader
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
			},
			{ // Converts SCSS to CSS
				test: /\.scss$/,
				loader: externalCSS.extract([
					'css-loader?sourceMap=true',
					'postcss-loader',
					'sass-loader?sourceMap=true',
				])
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
			}
		]
	},
	plugins: [
		// Un-Comment this to analyze bundle
		// new BundleAnalyzerPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			options: {
				// Config for Post-CSS and AutoPrefixer
				postcss: [ autoprefixer({ remove: true, browsers: ['>1%','last 2 versions','Firefox ESR'] }) ],
				// Context for Older Loaders
				context: path.join(__dirname, 'src'),
				output: {
					path: path.join(__dirname, 'dist')
				}
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ // Minifying Options using UglifyJS
			sourceMap: false,
			mangle: {
				screw_ie8: true,
			},
			compress: {
				warnings: false,
				screw_ie8: true,
				 drop_console: true,
			},
			comments: false
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			filename: "index.html",
			inject: "body",
		}),
		externalCSS,
	]
};