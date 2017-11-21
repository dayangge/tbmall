const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置
var WEBPACK_ENV = process.env.WEBPACK_ENV ||'dev'
//获取html-webpack-plugin的方法
var getHtmlConfig = function (name) {
    return{
        template:'./src/view/'+name+'.html',
        filename: `view/${name}.html`,
        inject:true,
        hash:true,
        chunks:['common',name]
    }
};

var config = {
    entry: {
        'index':'./src/page/index/index.js',
        'login':'./src/page/login/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'/dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    devServer: {
        inline: true//实时刷新
    },
    module: {
        rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:"resource/[name].[ext]"
                        }
                    }
                ]
            }
            ]
            },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))

    ]
};
if('dev' === WEBPACK_ENV){

}
module.exports = config;