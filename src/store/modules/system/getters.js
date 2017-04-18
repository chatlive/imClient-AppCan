import TYPES from './types'

/**
 * 作者名称
 * 属性
 */
const sys_authorName = state => state.author.name

/**
 * 作者邮箱
 * 属性
 */
const sys_authorEmail = state => state.author.email

/**
 * 版权
 * 属性
 */
const sys_copyright = (state, getters) => {
	return `版权所有 ©2017 ${getters.sys_authorName}`
}

/**
 * 全屏隐藏
 * 属性
 */
const sys_fullScreenHide = state => !state.fullScreen

/**
 * 全屏最大化
 * 属性
 */
const sys_fullScreenMax = state => state.fullScreen

export default {
	[TYPES.sys_getter_authorName]: sys_authorName,
	[TYPES.sys_getter_authorEmail]: sys_authorEmail,
	[TYPES.sys_getter_copyright]: sys_copyright,
	[TYPES.sys_getter_fullScreenHide]: sys_fullScreenHide,
	[TYPES.sys_getter_fullScreenMax]: sys_fullScreenMax,
}