/**
 * 前缀-登录
 */
let prefix_login = "http://192.168.30.32:9092/";
//let prefix_login = "http://localhost:21120/";

/**
 * 前缀-im
 */
let prefix_im = "http://192.168.30.32:9090/";
//let prefix_im = "http://localhost:49208/";

/***********************----分水岭----**********************/

/**
 * 登录地址
 */
const loginUrl = prefix_login + "api/account/login";

/**
 * url
 * （$.connection.hub.url）
 */
const imUrl = prefix_im + "signalr";
/**
 * 上传图片地址
 */
const upload_ImgUrl = prefix_im + "api/Chat/Upload_Img";
/**
 * 上传文件地址
 */
const upload_FileUrl = prefix_im + "api/Chat/Upload_File";

export default {
	loginUrl,

	imUrl,
	upload_ImgUrl,
	upload_FileUrl,
}