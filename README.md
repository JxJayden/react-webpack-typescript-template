## 目录结构

```
├── dist
├── node_modules
├── package.json
├── src
	├── index.tsx
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## 使用

```
git clone git@github.com:GaryChangCN/react-webpack-typescript.git
yarn install
yarn run dev //开发环境
yarn run build //生产环境
```
## 说明
开发环境不压缩代码，开启react的调试模式，只把.tsx编辑成ES6。
生产环节压缩代码，开启react生产环境模式，编译成es5。

## package.json

```json
 "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^0.28.1",
    "jsx-loader": "^0.13.2",
    "less": "^2.7.2",
    "less-loader": "^4.0.3",
    "style-loader": "^0.17.0",
    "ts-loader": "^2.0.3",
    "typescript": "^2.3.2",
    "webpack": "^2.4.1",
    "webpack-dev-server": "^2.4.5"
  },
  "dependencies": {
    "@types/react": "^15.0.23",
    "@types/react-dom": "^15.5.0",
    "prop-types": "^15.5.8",
    "react": "^15.5.4",
    "react-dom": "^15.5.4"
  }
```
这里需要注意的是安装了 @types/react和@types/react-dom。

## tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  },
  "exclude": [
    "node_modules"
  ]
}
```
## webpack.config.js

```js
module: {
	rules: [{
		test: /\.(jsx|js)$/,
		use: [{
			loader: "babel-loader"
		}]
	}, {
		test: /\.(tsx|ts)$/,
		loader:"ts-loader",
		exclude:"/node_modules/"
	}]
},
```

webpack用的是2.0

## .babelrc

```
{
  "presets": ["es2015", "react", "stage-0"]
}

```