const path = require('path');
require("dotenv").config({});
const Dotenv = require('dotenv-webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");


const htmlPluginConfig ={
    title: "Locamentum",
    filename: "index.html",
    template: "./src/template.html",
    // inject: false,
}
module.exports = (env) => {
  return {
    mode: "production",
    entry:{
        bundle:path.resolve(__dirname,'src/index.ts')
    },
    output:{
        filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist'),
        clean: true,
    },
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          },
      },
    devServer: {
            static: {
            directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 5000,
            hot:true,
            historyApiFallback: true,
            open: true,

        },
      // add source map to our bundle that allows us debug our written code in the browser
      devtool:'inline-source-map',
    module:{
        rules:[
            {
                // use the ts-loader to convert typescript to javascript. haha. a bunch of other things to but ignore please.
                test:/\.ts$/,
                use:'ts-loader',
                exclude:/node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    //   conver scss into css
                    loader: "sass-loader",
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              },
              {
                test: /\.css$/i,
                use: [
                    // inject javascript css into the DOM
                  "style-loader",
                  {
                    //   convert css into javascript
                    loader: "css-loader",
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              },
        ]
    },
  
    plugins: [].concat(
      env.SKIP_HTML
        ? [new htmlWebpackPlugin(htmlPluginConfig)     ]
        : [new htmlWebpackPlugin(htmlPluginConfig),
            new HtmlReplaceWebpackPlugin([
              {
                pattern: /GOOGLE_MAPS_API_KEY/g,
                replacement: process.env.GOOGLE_MAPS_API_KEY,
              },
            ]),
            new Dotenv({systemvars: true,}),
          ]
    ),
      // resolve any files that end in the following extensions
      resolve:{
        extensions: ['.ts', '.js']
    }
}
};