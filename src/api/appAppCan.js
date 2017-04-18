import STORE from 'store/index'
import TYPES from 'store/modules/imchat/types'
import sendFunction from 'api/appCan/sendFunction'
import CHAT from 'api/imService'

/**
 * 处理工具条高度
 * @param {Number} height - 工具条高度.
 */
const handleInputBarHeight = function(height) {
	let inputHeight = height + 'px';
	STORE.commit(TYPES.IMCHAT_MUTATION_SETINPUTBARHEIGHT, inputHeight);
};

/**
 * 拍照
 */
const cameraOpen = function() {
	let comtextareass = 0; //图片是否压缩,0表示压缩,非0或者不传表示不压缩
	let quality = 0; //图片压缩质量,comtextareass为0时有效,取值范围[0,100]

	//uexCamera.cbOpen=function (opCode, dataType, data){
	//uexCamera.open();

	/**
	 * 自定义相机拍照成功的回调方法
	 * @param {Number} opId - 操作ID,此函数中不起作用,可忽略.
	 * @param {Number} dataType - 数据类型.
	 * @param {String} data - 拍照成功后图片的保存路径.
	 */
	uexCamera.cbOpenInternal = function(opId, dataType, data) {
		//仅android
		sendFunction.sendpic(data);
	};
	uexCamera.openInternal(); //打开自定义相机

};
/**
 * 图片
 */
const photoOpen = function() {

	/**
	 * 成功选取图片后的回调方法
	 * @param {Number} opId - 操作ID,此函数中不起作用,可忽略.
	 * @param {Number} dataType - 数据类型.
	 * @param {String} data - 选择完成后返回的路径.
	 */
	uexImageBrowser.cbPick = function(opId, dataType, data) {
		sendFunction.sendpic(data);
	};

	uexImageBrowser.pick(); //从相册中选取一张图片，并返回路径
};
/**
 * 位置
 */
const mapOpen = function() {

};
/**
 * 文件
 */
const fileOpen = function() {
	/**
	 * 文件管理器的回调方法
	 * @param {Number} opId - 唯一标识符.
	 * @param {Number} dataType - 数据类型.
	 * @param {String} data - 返回文件管理器里选择的文件路径.
	 */
	uexFileMgr.cbExplorer = function(opId, dataType, data) {
		sendFunction.sendfile(data);
	}
	uexFileMgr.explorer(''); //文件管理器
};
/**
 * 开始录音
 */
const tapeStart = function() {

	//var t = Math.round(new Date().getTime());
	////按时间做为文件名称
	//uexAudio.startBackgroundRecord(2, t);
	////录音为mp3格式，需删除插件再请选择最新的插件。
};
/**
 * 录音完成
 */
const tapeEnd = function() {

	//uexAudio.cbBackgroundRecord = function(opCode, dataType, data) {
	//    postly(data);
	//}
	//uexAudio.stopBackgroundRecord();
};

/**
 * 初始化-聊天键盘插件
 */
const init_uexChatKeyboard = function() {

	/**
	 * 获取输入工具条高度的回调方法
	 * @param {String} data - 参数json.
	 * @param {Number} data.height - 工具条高度.
	 */
	uexChatKeyboard.cbGetInputBarHeight = function(data) {
		data = JSON.parse(data);
		let height = data.height;
		handleInputBarHeight(height);
	}

	/**
	 * 完成输入的监听方法
	 * @param {String} data - 参数json.
	 * @param {String} data.emojiconsText - 输入框里的内容.
	 */
	uexChatKeyboard.onCommit = function(data) {
		data = JSON.parse(data);
		let msgText = data.emojiconsText;
		sendFunction.sendMsg(msgText);
	};
	/**
	 * 点击分享里选项的监听方法
	 * @param {String} data - 分享里各选项对应的位置,0:拍照,1:图片,2:位置,3:文件.
	 */
	uexChatKeyboard.onShareMenuItem = function(data) {
		//data 为String类型，官网描述错误，草拟吗appCan
		//alert(`onShareMenuItem:[${Object.prototype.toString.call(data)}]`);
		switch(data) {
			case '0':
				cameraOpen();
				break;
			case '1':
				photoOpen();
				break;
			case '2':
				mapOpen();
				break;
			case '3':
				fileOpen();
				break;
		}
	};
	/**
	 * 录音按钮的监听方法
	 * @param {String} data - 参数json.
	 * @param {String} data.status - 录音按钮的状态,0:开始录音,1:录音完成,-1:取消录音.
	 */
	uexChatKeyboard.onVoiceAction = function(data) {

		//		alert(`onVoiceAction:[${data}]`);
		data = JSON.parse(data);
		switch(data.status) {
			case 0:
				tapeStart();
				break;
			case 1:
				tapeEnd();
				break;
			case -1:
				return;
				break;
		}
	};
	/**
	 * 键盘弹出或收起时的监听方法
	 * @param {Object} data
	 */
	uexChatKeyboard.onKeyBoardShow = function(data) {};
	/**
	 * 点击发送的监听方法
	 * @param {Object} data - 参数对象.
	 * @param {String} data.emojiconsText - 输入框里的内容.
	 */
	uexChatKeyboard.onCommitJson = function(data) {
		//let emojiconsText = data.emojiconsText;
		//sendFunction.sendMsg(emojiconsText);
	};
	/**
	 * 编辑框输入监测的关键字之后的监听方法
	 * @param {Object} data
	 */
	uexChatKeyboard.onInputKeyword = function(data) {};

	//	/**
	//	 * 获取到当前位置的回调方法
	//	 * @param {String} data - 位置信息该字符串为JSON格式.
	//	 * @param {Object} data.longitude - 经度.
	//	 * @param {Object} data.latitude - 纬度.
	//	 * @param {Object} data.timestamp - 时间戳 “2014-11-2217:46:37”格式.
	//	 */
	//	uexBaiduMap.cbCurrentLocation = function(data) {
	//		
	//		alert(`onVoiceAction:[${data}]`);
	//	}
};

/**
 *初始化-uex插件
 */
const init = function() {
	/**
	 * 出现异常时的回调方法
	 * @param {Number} opId 操作ID，在此函数中不起作用，可忽略
	 * @param {Number} errorCode 错误代码详见ErrorCode
	 * @param {String} errorInfo 错误信息
	 */
	uexWidgetOne.cbError = function(opId, errorCode, errorInfo) {
		let data = `错误[${errorCode}]:${errorInfo}`;
		alert(data);
	};
	init_uexChatKeyboard();
};
/**
 * 打开聊天输入
 */
const open = function() {
	let viewInfo = {
		"emojicons": "res://dingdingface/dingdingface.xml",
		//		"emojicons": "res://emojicons/emojicons.xml",
		"shares": "res://shares/shares.xml",
		"placeHold": "请输入内容",
		"touchDownImg": "res://1.png",
		"dragOutsideImg": "res://2.png",
		"textColor": "#FFFFFF",
		"textSize": "15.5",
		"sendBtnbgColorUp": "#21BA45",
		"sendBtnbgColorDown": "#198F35",
		"sendBtnText": "发送",
		"sendBtnTextSize": "15.5",
		"sendBtnTextColor": "#FFFFFF",
		"keywords": ['@'],
		"inputMode": 0
	};
	uexChatKeyboard.open(viewInfo);
};

/**
 * 关闭聊天输入
 */
const close = function() {
	uexChatKeyboard.close();
};
/**
 * 获取输入工具条高度 
 */
const getInputBarHeight = function() {
	uexChatKeyboard.getInputBarHeight();
};

/**
 * 退出系统
 */
const quit = function() {
	CHAT.ClientManage.stopClient();
	uexWidgetOne.exit();
};

let appAppCan = {
	init: init,
	open: open,
	close: close,
	getInputBarHeight: getInputBarHeight,
	quit: quit,
};

/**
 * app开发平台（AppCan开发平台）
 */
export default appAppCan