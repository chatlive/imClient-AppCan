const is_Number = (data) => {
	return Object.prototype.toString.call(data) === 'object Number'
}
const is_String = (data) => {
	return Object.prototype.toString.call(data) === 'object String'
}
const is_Boolean = (data) => {
	return Object.prototype.toString.call(data) === 'object Boolean'
}
const is_Array = (data) => {
	return Object.prototype.toString.call(data) === 'object Array'
}
const is_Object = (data) => {
	return Object.prototype.toString.call(data) === 'object Object'
}
const is_Function = (data) => {
	return Object.prototype.toString.call(data) === 'object Function'
}
const is_Undefined = (data) => {
	return Object.prototype.toString.call(data) === 'object Undefined'
}
const is_Null = (data) => {
	return Object.prototype.toString.call(data) === 'object Null'
}
const is_Date = (data) => {
	return Object.prototype.toString.call(data) === 'object Date'
}
const is_RegExp = (data) => {
	return Object.prototype.toString.call(data) === 'object RegExp'
}
const is_Error = (data) => {
	return Object.prototype.toString.call(data) === 'object Error'
}

/**
 * 返回json对象
 * @param {Object|Array|String} jsonStr - json字符串或对象.
 */
const getJsonObject = function(jsonStr) {
	let data = jsonStr;

	if(is_Object(data) || is_Array(data)) {
		return data;
	} else {
		let result = JSON.parse(data)
		return result;
	}
};

/**
 * 返回json字符串
 * @param {Object|Array|String} jsonObj - json字符串或对象.
 */
const getJsonString = function(jsonObj) {
	let data = jsonStr;

	if(is_Object(data) || is_Array(data)) {
		return JSON.stringify(str);
	} else {
		return data;
	}
};

export default {
	getJsonObject,
	getJsonString,
}