import download_file from 'api/appCan/download_file'

/**
 * 文件展示
 * @param {Object} imgPath
 */
const file_Show = function(path) {
	if(path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
		download_file.loadRemoteFile(path, function(localPath) {
			_file_Show(localPath);
		});
	} else {
		_file_Show(path);
	}
};

/**
 * 文件展示
 * @param {Object} imgPath
 */
const _file_Show = function(localFilePath) {
	var extensionName = getExtensionNameByPath(localFilePath).toLowerCase();
	switch(extensionName) {
		case 'bmp':
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
			img_Show(localFilePath);
			break;
		default:
			document_Show(localFilePath);
			break;
	}
};

/**
 * 图片展示
 * @param {Object} imgPath
 */
const img_Show = function(imgPath) {

	//图片文件的路径集合,支持的文件路径协议 wgt:// wgts:// res:// file:// http:// https://.
	var imageUrlSet = new Array(imgPath);

	//表示当前要显示的图片在集合中的索引，默认为0。不传时，图片集显示为九宫格方式
	var activeIndex = 0;
	uexImageBrowser.open(imageUrlSet, activeIndex);
}

/**
 * 文档展示（调用第三方应用）
 * @param {Object} localFilePath
 */
const document_Show = function(localFilePath) {

	//支持的文件路径协议 wgt:// wgts:// res:// file://.
	uexDocumentReader.openDocumentReader(localFilePath);
}

/**
 * 截取文件目录
 * 
 * @param {Object} filePath
 */
const getCatalogByFilePath = function(filePath) {
	var catalog = filePath.substring(0, filePath.lastIndexOf("/") + 1);
	return catalog;
};

/**
 * 截取扩展名
 * 
 * @param {Object} filePath
 */
const getExtensionNameByPath = function(filePath) {
	// 1.获取文件路径
	var path = filePath.replace(/\\/g, '/');
	// 2.截取文件名
	var extensionName = path.substring(path.lastIndexOf(".") + 1, path.length);
	return extensionName;
};

const FILESHOW = {
	file_Show,
	img_Show,
	document_Show,
	getCatalogByFilePath,
	getExtensionNameByPath,
}

export default FILESHOW