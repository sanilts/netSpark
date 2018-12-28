const path = require( 'path' );
const glob = require( 'glob' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const magicImporter = require( 'node-sass-magic-importer' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MinifyPlugin = require( 'babel-minify-webpack-plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

module.exports = {
    entry        : './source/_assets/app.js',
    output       : {
        path       : path.resolve( __dirname, 'public/dist' ),
        filename   : 'bundle.js',
        publicPath : './'
    },
    watchOptions : {
        ignored : [ 'public' ]
    },
    resolve      : {
        alias : {
            './images/layers.png$'         : path.resolve(
                __dirname,
                './node_modules/leaflet/dist/images/layers.png'
            ),
            './images/layers-2x.png$'      : path.resolve(
                __dirname,
                './node_modules/leaflet/dist/images/layers-2x.png'
            ),
            './images/marker-icon.png$'    : path.resolve(
                __dirname,
                './node_modules/leaflet/dist/images/marker-icon.png'
            ),
            './images/marker-icon-2x.png$' : path.resolve(
                __dirname,
                './node_modules/leaflet/dist/images/marker-icon-2x.png'
            ),
            './images/marker-shadow.png$'  : path.resolve(
                __dirname,
                './node_modules/leaflet/dist/images/marker-shadow.png'
            )
        }
    },
    module       :
        {
            rules : [
                {
                    test    : /\.js$/,
                    exclude : /(node_modules|bower_components)/,
                    use     : {
                        loader  : 'babel-loader',
                        options : {
                            presets : [ '@babel/preset-env' ]
                        }
                    }
                },
                {
                    test : require.resolve( 'jquery' ),
                    use  : [ {
                        loader  : 'expose-loader',
                        options : 'jQuery'
                    }, {
                        loader  : 'expose-loader',
                        options : '$'
                    } ]
                },
                {
                    test : /\.(sa|sc|c)ss$/,
                    use  : [
                        { loader : MiniCssExtractPlugin.loader },
                        { loader : 'css-loader', options : { importLoaders : 1 } },
                        {
                            loader  : 'postcss-loader',
                            options : {
                                plugins : () => [ require( 'autoprefixer' )( {
                                    'browsers' : [ '> 1%', 'last 2 versions' ]
                                } ) ],
                            }
                        },
                        {
                            loader  : 'sass-loader',
                            options : {
                                importer : magicImporter()
                            }
                        }
                    ],
                },
                {
                    test : /\.(png|jp(e*)g)$/,
                    use  : [ {
                        loader  : 'file-loader',
                        options : {
                            name       : '[name].[ext]',
                            outputPath : 'images/'
                        }
                    } ]
                },
                {
                    test : /\.(eot|svg|ttf|woff|woff2)/,
                    use  : [ {
                        loader  : 'file-loader',
                        options : {
                            name       : '[name].[ext]',
                            outputPath : 'fonts/'
                        }
                    } ]
                },

            ]
        },
};