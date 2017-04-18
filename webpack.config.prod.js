const path = require("path");
const fs = require('fs');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/* Extract Text Plugin Files */
const externalCSS = new ExtractTextPlugin('main.[chunkHash].css');
const internalCSS = new ExtractTextPlugin('internal.css');

module.exports = {
	resolve: {
		modules: [ // Allow Easy non-relative imports
			path.resolve("./src"),
			'node_modules'
		],
		extensions: [".jsx", ".js"], // Resolves Imports
	},
	entry: { //Entry Point for Webpack
		bundle: [
			'./src/app.js', // Main App JS File
			'./src/styles/index.scss', // Main Page Styles
			'./src/styles/preloader/index.scss', // Styles to be injected inline into the built index.html page
		],
	},
	output: {
		path: path.join(__dirname, 'public', 'formApp', 'dist'),
		filename: "[name].[chunkHash].js", // Bundled Javascript Webpack Spits out. Hashed for cache busting
		chunkFilename: "[name].[chunkHash].js",
		publicPath: '/formApp/dist/'
	},
	module: {
		rules: [
			{ // Babel loader for converting ES2015 to ES5
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{ // Loads the preloader sass as header style tags
				include: [ path.resolve(__dirname, 'src/styles/preloader') ],
				loader: internalCSS.extract([
					'css-loader?sourceMap=true',
					'postcss-loader',
					'resolve-url-loader',
					'sass-loader?sourceMap=true',
				]),
			},
			{ // Converts SCSS to CSS
				test: /\.scss$/,
				exclude: [ path.resolve(__dirname, 'src/styles/preloader') ],
				loader: externalCSS.extract([
					'css-loader?sourceMap=true',
					'postcss-loader',
					'resolve-url-loader',
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
					{
						loader: 'image-webpack-loader',
						query: {
							progressive: true,
							gifsicle: {
								interlaced: false,
							},
							mozjpeg: {
								quality: 80,
								progressive: true,
							},
							optipng: {
								optimizationLevel: 7,
							},
							svgo: {
								minifyStyles: true,
								removeMetadata: true,
								removeDesc: true,
								removeUselessDefs: true,
								cleanupAttrs: true,
								removeComments: true,
								removeEditorsNSData: true,
								cleanupIDs: true,
								collapseGroups: true,
							}
						}
					},
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
			'FQ_APP_VERSION': JSON.stringify('1.1.0'),
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
					path: path.join(__dirname, 'formApp', 'dist')
				}
			}
		}),
		new webpack.ProvidePlugin({
			'regeneratorRuntime': 'regenerator-runtime' // Regenerator Runtime for Generator Functions / Async Functions
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				// this assumes your vendor imports exist in the node_modules directory
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			async: 'common',
			children: true,
			minChunks: 2,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity,
		}),
		new webpack.optimize.UglifyJsPlugin({ // Minifying Options using UglifyJS
			sourceMap: false,
			mangle: {
				screw_ie8: true,
			},
			compress: {
				warnings: false,
				screw_ie8: true,
				// drop_console: true,
			},
			comments: false
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			filename: path.join( __dirname , 'resources', 'views', 'client', 'form.blade.php'),
			inject: "body",
		}),
		new ScriptExtHtmlWebpackPlugin({
			inline: 'manifest',
		}),
		internalCSS,
		externalCSS,
		new StyleExtHtmlWebpackPlugin({
			file: 'internal.css',
			position: 'head-top',
		}),
		new FaviconsWebpackPlugin({
			logo: path.join(__dirname, 'src/assets/favicons/fqFavicon.svg'),
			prefix: 'assets/favicons/',
			emitStats: true,
			statsFilename: 'iconstats-[hash].json',
			persistentCache: true,
			inject: true,

			title: 'Financial Questionnaire',
			appName: 'Financial Questionnaire',
			appDescription: 'Access Your Net Worth',
			developerName: 'Paradigm Life',
			developerURL: 'https://paradigmlife.net/',
			background: "#3475ad",
			path: "/formApp/dist/assets/favicons",
			display: "standalone",
			orientation: "portrait",
			start_url: "/",
			version: "1.0",
			online: true,
			preferOnline: true,

			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: true,
				favicons: true,
				firefox: true,
				opengraph: true,
				twitter: true,
				yandex: true,
				windows: true,
			}
		})
	]
};