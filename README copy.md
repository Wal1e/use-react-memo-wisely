# Getting Started with react-monaco-editor

基于react-monaco-editor库构建在线代码编辑器 [react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
可用在线代码编辑器复制本地代码看效果
![monaco-demo](https://i.postimg.cc/cHD6Rxvh/monaco-demo.png)

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React [react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor).

### 代码高亮的问题

这里需要修改webpack的配置，由于这个demo是用creat-react-app脚手架创建的，不会有webpck的配置项（其实复杂的配置被封装了起来， 对项目的启动是通过react-scripts实现的）
网上有很多修改webpack配置方式，比如npm run eject弹出webpack配置文件进行修改‘、使用react-app-rewired修改、使用craco（Create React App Configuration Override）配置等
该项目使用饿了react-app-rewired进行修改
1.安装react-app-rewired， 在根目录新建config-overrides.js
2.安装monaco-editor-webpack-plugin，修改配置
```javascript

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'typescript', 'vb', 'xml', 'yaml']
    }),
  );
  return config;
}

```
### 可能遇到的版本不匹配问题

项目刚开始安装依赖包的时候，默认都是install最新的，并没有进行版本管理，后来一直有版本不匹配的问题，具体折腾的细节就不详述了，反正各种版本都大致看看了，具体在最后的参考链接
"monaco-editor-webpack-plugin@4.1.2" 与 "monaco-editor@0.27.0"
还有不要直接使用monaco-editro，要使用react-monaco-editro
### 参考链接

[https://www.npmjs.com/package/monaco-editor-webpack-plugin](https://www.npmjs.com/package/monaco-editor-webpack-plugin).

[https://www.npmjs.com/package/react-monaco-editor/v/0.45.0](https://www.npmjs.com/package/react-monaco-editor/v/0.45.0).

[https://www.npmjs.com/package/monaco-editor/v/0.27.0](https://www.npmjs.com/package/monaco-editor/v/0.27.0)
