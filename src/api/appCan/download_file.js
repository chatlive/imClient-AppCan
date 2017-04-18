const getNewDownloaderId = function() {
	var downloaderId = appcan.locStorage.getVal('NewDownloaderId');
	if(downloaderId == null) {
		downloaderId = 100;
		appcan.locStorage.setVal('NewDownloaderId', downloaderId);
	} else {
	    downloaderId = parseInt(downloaderId) + 1;
		appcan.locStorage.setVal('NewDownloaderId', downloaderId);
	}
	return downloaderId;
};

/**
 * 加载-远程文件
 * @param {Object} remotePath
 * @param {Object} callback
 */
const loadRemoteFile = function(remotePath, callback) {

	//获取平台信息  1：android 2 ： ios		
	var platName = uexWidgetOne.platformName.toLowerCase();

	var fileName = getFileNameByPath(remotePath);

	var localPath = platName == 'android' ?
		('/sdcard/BcImChat/' + fileName) :
		('wgt://data/BcImChat/' + fileName);

	var id = 100;
	uexFileMgr.isFileExistByPath(id, localPath);

	uexFileMgr.cbIsFileExistByPath = function(opId, dataType, data) {
		switch(data) {
			case 0: //文件不存在
			    loadFile(remotePath, localPath, callback);
				break;
			case 1: //文件存在
				callback(localPath);
				break;
			default:
				break;
		}
	}

};

/**
 * 下载文件
 * @param {Object} serverURL
 * @param {Object} savePath
 * @param {Object} callback
 */
const loadFile = function(serverURL, savePath, callback) {

	var id = getNewDownloaderId();
	var mode = 1;

	uexDownloaderMgr.createDownloader(id);

	uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
		if(data == 0) {
			uexDownloaderMgr.download(opCode, serverURL, savePath, mode)
		} else {
			uexWindow.alert("提示", "下载失败！", "OK");
		}
	}

	uexDownloaderMgr.onStatus = function(opId, fileSize, percent, status) {
		switch(status) {
			case 0: //下载中				
				var msg = '正在下载...' + percent + '%';

				uexWindow.toast(1, 5, msg, 0);
				break;
			case 1: //下载完成
				uexWindow.closeToast();

				callback(savePath); //具体操作,调走后下面代码不执行
				//uex控件多重级联调用并发症
				//callback级联回调（多参数）并发症
				//$debug.ReturnServer('LoadFile', 'callback-调用完毕！');
				uexDownloaderMgr.closeDownloader(opCode); //（必须放在最后，否则其它不能进行）
				break;
			case 2: //下载失败
				uexWindow.alert("提示", "下载失败！", "OK");

				uexDownloaderMgr.closeDownloader(opCode);
				break;
			case 3: //已取消下载
				break;
		}
	}

}

/**
 * 截取文件目录
 * @param {Object} filePath
 */
const getCatalogByFilePath = function(filePath) {
	var catalog = filePath.substring(0, filePath.lastIndexOf("/") + 1);
	return catalog;
};

/**
 * 截取文件名
 * @param {Object} filePath
 */
const getFileNameByPath = function(filePath) {
	// 1.获取文件路径
	var path = filePath.replace(/\\/g, '/');
	// 2.截取文件名
	var fileName = path.substring(path.lastIndexOf("/") + 1, path.length);
	return fileName;
};

const DOWNLOADFILE = {
	loadRemoteFile,
	loadFile,
	getCatalogByFilePath,
	getFileNameByPath,
}

export default DOWNLOADFILE