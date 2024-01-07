const path = require('path')

function reslove(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', reslove('src/renderer'))
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/renderer/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      webSecurity: false,
      preload: 'src/main/preload.js',
      // contextIsolation: false,
      mainProcessFile: 'src/main/background.ts',
      mainProcessWathch: ['src/main/**'],
      builderOptions: {
        appId: "com.beibei",
        productName: "beibei-install",
        // icon: "./public/icons/icon.ico",
        files: ["**/*"],
        // asar: true,
        // mac: {
        //   icon: "./public/icon.png",
        //   target: ["zip", "dmg"],
        //   category: "com.catpoint-category.utilities"
        // },
        // win: {
        //   icon: "./public/icons/icon.ico",
        //   target: ["zip", "nsis"]
        // },
        //window自动义安装
        "nsis": {
          "oneClick": false,            //是否静默安装（一键式安装）
          "perMachine": true,           //安装模式 true=所有用户 false=自己
          "allowElevation": true,       //允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序
          "allowToChangeInstallationDirectory": true,   //是否安装时是否能更换安装目录
          "createDesktopShortcut": true,    //是否创建桌面快捷建
          // "menuCategory": true,             //是否在开始菜单里创建子菜单
          // "installerIcon": "build/icons/icon.ico",     //安装应用的图片,一定要 ico格式的图片
          // "installerSidebar": "public/logo.bmp",   //安装程序左边的图片，一定是要位图 bmp 格式 一定要 164*314
          // "uninstallerSidebar": "build/icons/uninstall.bmp",   //安装程序左边的图片，一定是要位图 bmp 格式 一定要 164*314
          // "include": "scripts/installer.nsi"
        }
      }
    }
  }
}
