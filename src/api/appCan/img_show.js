import download_file from 'api/appCan/download_file'

/**
 * 图片展示
 * @param {Object} imgPath
 */
const img_Show = function(path) {
	if(path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
		download_file.loadRemoteFile(path, function(localPath) {
			_img_Show(localPath);
		});
	} else {
		_img_Show(path);
	}
};

/**
 * 图片展示
 * @param {Object} imgPath
 */
const _img_Show = function(imgPath) {

	//图片文件的路径集合,支持的文件路径协议 wgt:// wgts:// res:// file:// http:// https://.
	var imageUrlSet = new Array(imgPath);

	//表示当前要显示的图片在集合中的索引，默认为0。不传时，图片集显示为九宫格方式
	var activeIndex = 0;
	uexImageBrowser.open(imageUrlSet, activeIndex);
};

/**
 * 图片展示注册
 * @param {Object} selector
 */
const img_Show_Register = function(selector) {
	$(selector).on('click', function(e) {
		img_Show(this.src);
	});
};

/**
 * 文件打开注册
 * @param {Object} selector
 */
const file_Show_Register = function(selector, fun) {
	$(selector).on('click', function(e) {
		var filepath = $(this).attr('filepath');
		fun(filepath);
	});
};

/**
 * 公告打开注册
 * @param {Object} selector
 */
const notice_Show_Register = function(selector, fun) {
	$(selector).on('click', function(e) {
		var noticeId = $(this).attr('noticeId');
		var noticeTitle = $(this).html();
		fun(noticeId, noticeTitle);
	});
};

/**
 * 消息已读未读
 * @param {Object} selector
 */
const msgStatus_Show_Register = function(selector, fun) {
	$(selector).on('click', function(e) {
		var messageId = $(this).attr('messageId');
		fun(messageId);
	});
};

/**
 * 图片聊天页面视图
 * @param {Object} selector
 */
const img_ChatView = function(selector) {
	$(selector).parent().css('width', '37%');
};

const IMGSHOW = {
	img_Show,
	img_Show_Register,
	file_Show_Register,
	notice_Show_Register,
	msgStatus_Show_Register,
	img_ChatView,
};

export default IMGSHOW