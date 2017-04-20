import TYPES from './types'

/**
 * 开启全屏模式
 * 同步执行
 */
const sys_openFullscreen = (state) => {
	state.fullScreen = true
}

/**
 * 关闭全屏模式
 * 同步执行
 */
const sys_closeFullscreen = (state) => {
	state.fullScreen = false
}

/**
 * 设置用户信息
 * 同步执行
 */
const sys_setUser = (state, newUser) => {
	//官方没有说明对象结构模式应用在module
	//必须单独赋值
	state.APPID = newUser.appID
	state.user.account = newUser.account
	state.user.img = newUser.img
	state.user.name = newUser.name
}

/**
 * 设置当前顶级菜单
 * 同步执行
 */
const sys_mutation_setCurrentMenu = (state, newMenu, rootState) => {
	//官方没有说明对象结构模式应用在module
	//必须单独赋值
	state.currentMenu.id = newMenu.id;
	state.currentMenu.name = newMenu.name;
	state.currentMenu.icon = newMenu.icon;
}

export default {
	[TYPES.sys_mutation_openFullscreen]: sys_openFullscreen,
	[TYPES.sys_mutation_closeFullscreen]: sys_closeFullscreen,
	[TYPES.sys_mutation_setUser]: sys_setUser,
	[TYPES.sys_mutation_setCurrentMenu]: sys_mutation_setCurrentMenu,
}