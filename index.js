var images = require('images'),
	path = require('path'),
	config = require('./config'),
	fs = require('fs'),
	pointerW = 0,
	Imagemin = require('imagemin'),
	imagemin = new Imagemin();

var imageList = []; // 从给定目录中得到的图片列表

getImageListFormDir(config.imgSrc);

function getImageListFormDir(path) {
	fs.exists(path, function(e) {
		if (e) {
			fs.readdir(path, function(err, files) {
				if (err) {
					console.log('[ERROR] ', '读取文件错误！');
				} else {
					if (files.length) {
						files = files.sort(); // 根据文件名做一个简单的排序
						if (path[path.length - 1] !== '/')
							path = path + '/';
						files.forEach(function(file, index) {
							var img = images(path + file);
							imageList.push({
								filename: path + file,
								width: img.width(),
								height: img.height()
							});
						});

						//images.gc();
						// 利用上面的参数进行合并
						imageSprite(imageList);
					}
				}
			})
		} else {
			console.log('[ERROR] ', path, '不存在！');
		}
	})
}

function imageSprite(imageList) {
	var width, height,size = getImgAllWidth(imageList);
	if (config.isStrict) {
		width = (config.width + config.gap) * imageList.length;
		height = config.height;
	} else {
		width = size.width;
		height = size.height;
	}

	images.setLimit(width, height);
	var bg = images(width, height);
	if (!config.transparent)
		bg.fill(0xff, 0xff, 0xff, 1);

	var widthLabel = 0;
	imageList.forEach(function(image, index) {
		var img = images(image.filename);
		if (config.isStrict)
			img.size(config.width, config.height);
		bg.draw(img, widthLabel, 0);

		console.log('[INFO] 文件：', image.filename, '已拼合...');

		widthLabel += img.width() + config.gap;
	});

	// 保存图片
	config.outputName = config.outputName ? config.outputName : (Date.parse(new Date()) + '.png');
	var _o = path.join(config.dest, config.outputName);
	bg.save(_o, config.outputType);
	console.log('[INFO] 图片保存路径！', _o);
	console.log('[INFO] 开始压缩图片！');

	imagemin.src(_o).dest(_o).use(Imagemin.optipng({ optimizationLevel: 3 }));
	console.log('[INFO] 图片压缩完毕!');

	imagemin.optimize(function (err, file) {
	    if (err) {
	        throw err;
	    }

	    // console.log(file);
	    // => { contents: <Buffer 89 50 4e ...>, mode: '0644' }
	    // 自动生成配置文件
	    //writeFile();
	});
}

function getImgAllWidth(imageList) {
	var width = 0, height = 0;
	imageList.forEach(function(image) {
		width += image.width;
		height = image.height > height ? image.height : height;
	});
	return {
		width: width,
		height: height
	};
}

function writeFile() {
	fs.open('conf.css', 'w', 0644, function(e, fd) {
		if (e) throw e;
		fs.writeSync(fd, cssConf);
	});

	fs.open('conf.js', 'w', 0644, function(e, fd) {
		if (e) throw e;
		fs.writeSync(fd, JSON.stringify(jsConf));
	});
}