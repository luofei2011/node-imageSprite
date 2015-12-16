#### 图片拼合功能说明

给定一组相似图片，为减少http请求对图片进行合并。或者动画逐帧播放功能时，需要把图片都整合到一个大图上。

#### 使用说明

+ `node.js`安装：该工具依赖于`node`执行，因此需要在机器上安装`nodejs`

> 对nodejs的版本有要求，主要依赖于images这个包。0.10.*/0.12.*都是ok的，最新的4.0+测试不成功

具体兼容性可看[这个ISSUE](https://github.com/zhangyuanwei/node-images/issues/42)

+ 根据`package.json`安装依赖

	```
	npm install
	```

+ 在`config.js`文件中修改默认配置，并把需要拼合的图片放到指定目录中
	```
	img
	|--1.png
	|--2.png
	```

__PS:__需要拼合的图片命名最好可以比较（因为有拼接的顺序）

+ 执行工具

	```
	node index.js
	```
