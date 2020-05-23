var path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
          .set("@", resolve("src"))
          .set("assets", resolve("src/assets"))
          .set("components", resolve("src/components"))
          .set("base", resolve("baseConfig"))
          .set("public", resolve("public"));
      },
    devServer: {
        proxy: {
            '/api':{
                // target:'http://jsonplaceholder.typicode.com',
                target:'http://hvzttbl.cn',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}