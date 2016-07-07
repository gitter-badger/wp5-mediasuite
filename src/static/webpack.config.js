//TODO d3 via deze route ook inladen

//http://webpack.github.io/docs/usage.html
//https://www.sitepoint.com/javascript-modules-bundling-transpiling/
//http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6
//https://github.com/petehunt/webpack-howto
//https://medium.com/@dtothefp/why-can-t-anyone-write-a-simple-webpack-tutorial-d0b075db35ed#.l95n3w625
//https://github.com/webpack/react-starter

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
	entry: [ 'bootstrap-loader', APP_DIR + '/index.jsx'],

	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		library: 'clariah',
    	libraryTarget: 'umd',
    	umdNamedDefine: true
	},

	resolve: { extensions: ['', '.js', '.jsx'] },

	module : {
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel',
				exclude: /node_modules/
			},
			{
				test: /bootstrap-sass[\\\/]assets[\\\/]javascripts/,
				loader:'imports?jQuery=jquery'
			},
			{
	        	test: /\.css$/,
	        	loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
					'postcss',
				],
			},
			{
				test: /\.scss$/,
	        	loaders: [
					'style',
					'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
					'postcss',
					'sass',
				],
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url?limit=10000"
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				loader: 'file'
			}
		]
	}

};

module.exports = config;