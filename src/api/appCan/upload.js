import baseUrl from 'api/baseUrl'
import jsonBC from 'api/appCan/jsonBC'

const getNewUpload_Id = function() {
	let id = appcan.locStorage.getVal('NewUpload_Id');
	if(id == null) {
		id = 100;
		appcan.locStorage.setVal('NewUpload_Id', id);
	} else {
		id = parseInt(id) + 1;
		appcan.locStorage.setVal('NewUpload_Id', id);
	}
	return id;
};
/**
 * 上载图片
 * @param {String} imgPath
 * @param {Function} callback
 */
const upload_Img = function(imgPath, callback) {

	var serverURL = baseUrl.upload_ImgUrl;
	var id = getNewUpload_Id();

	uexUploaderMgr.createUploader(id, serverURL);

	uexUploaderMgr.cbCreateUploader = function(id, dataType, data) {
		if(data == 0) {
			var filePath = imgPath;
			var inputName = 'imgPath';
			var quality = 1;

			uexUploaderMgr.uploadFile(id, filePath, inputName, quality);
		} else {
			uexWindow.alert("提示", "发送失败，请重发！", "OK");
		}
	};

	uexUploaderMgr.onStatus = function(opId, fileSize, percent, responseString, status) {
		switch(status) {
			case 0: //正在上传
				var msg = '正在上传...' + percent + '%';
				uexWindow.toast(1, 5, msg, 0);
				break;
			case 1: //上传完成
				uexWindow.closeToast();
				//服务器路径
				let serverObject = jsonBC.getJsonObject(responseString);
				var _serverPath = serverObject.info.PreviewPath;
				callback(_serverPath);
				//关闭上传通道
				uexUploaderMgr.closeUploader(opId);
				break;
			case 2: //上传失败
				uexWindow.alert("提示", "发送失败，请重发！", "OK");
				callback(null);
				//关闭上传通道
				uexUploaderMgr.closeUploader(opId);
				break;
		}
	};

}
/**
 * 上载文件
 * @param {String} imgPath
 * @param {Function} callback
 */
const upload_File = function(localFilePath, callback) {

	var serverURL = baseUrl.upload_FileUrl;
	var id = getNewUpload_Id();

	uexUploaderMgr.createUploader(id, serverURL);

	uexUploaderMgr.cbCreateUploader = function(id, dataType, data) {
		if(data == 0) {
			var filePath = localFilePath; //localFilePath 与 filePath 重名会出问题
			var inputName = 'imgPath';
			var quality = 1;

			uexUploaderMgr.uploadFile(id, filePath, inputName, quality);
		} else {
			uexWindow.alert("提示", "发送失败，请重发！", "OK");
		}
	};

	uexUploaderMgr.onStatus = function(opId, fileSize, percent, responseString, status) {
		switch(status) {
			case 0: //正在上传
				var msg = '正在上传...' + percent + '%';
				uexWindow.toast(1, 5, msg, 0);
				break;
			case 1: //上传完成
				uexWindow.closeToast();
				//服务器路径
				let serverObject = jsonBC.getJsonObject(responseString);
				var _serverPath = serverObject.info.PreviewPath;
				callback(_serverPath);
				//关闭上传通道
				uexUploaderMgr.closeUploader(opId);
				break;
			case 2: //上传失败
				uexWindow.alert("提示", "发送失败，请重发！", "OK");
				callback(null);
				//关闭上传通道
				uexUploaderMgr.closeUploader(opId);
				break;
		}
	};
}

const upload = {
	upload_Img,
	upload_File,
};

export default upload