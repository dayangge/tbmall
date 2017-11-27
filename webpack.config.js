const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置
var WEBPACK_ENV = process.env.WEBPACK_ENV ||'dev';
//获取html-webpack-plugin的方法
var getHtmlConfig = function (name,title) {
    return{
        template:'./src/view/'+name+'.html',
        filename: `view/${name}.html`,
        inject:true,
        hash:true,
        chunks:['common',name],
        title
    }
};

var config = {
    entry: {
        'index':'./src/page/index/index.js',
        'login':'./src/page/login/index.js',
        'result':'./src/page/result/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'/dist/',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    devServer: {
        inline: true,//实时刷新
        proxy:{
            '/product/list.do': {
                target: 'http://happymmall.com',
                changeOrigin: true,
                secure: false
            }
        }
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
                test: /\.string$/,
                use: [
                    {
                    loader: 'html-loader',
                 }
               ]
            },


            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8912,
                            name:"resource/[name].[ext]"
                        }
                    }
                ]
            }
            ]
            },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作'))

    ]
};
if('dev' === WEBPACK_ENV){

}
module.exports = config;