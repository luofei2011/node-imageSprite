var config = {
	/*每帧数据的宽度*/
	width: 308,
	/*每帧数据的高度*/
	height: 227,
	/*强烈建议设置为0即可！不然或许会引起不必要的麻烦*/
	gap: 0,
	/*共有多少张*/
	frames: 6,
	/*待压缩的文件目录*/
	imgSrc: './img/',
	/*输出目录，如果为空则在根目录输出*/
	dest: './tmp/',
	/*拼合图片的背景是否透明*/
	transparent: true,
	/*是否严格验证给定的width，height拼合；否则按照图片原有尺寸进行拼合*/
	isStrict: false,
	/*输出文件名*/
	//outputName: 'bdbri_icons.png',
	outputType: 'png'// 默认的保存格式，不需要修改
};

module.exports = config;