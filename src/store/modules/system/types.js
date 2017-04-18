/**
 * 开启全屏模式
 * 事件类型
 */
const sys_action_openFullscreen = 'sys_action_openFullscreen'

/**
 * 关闭全屏模式
 * 事件类型
 */
const sys_action_closeFullscreen = 'sys_action_closeFullscreen'

/**
 * 开启全屏模式
 * 事件类型
 */
const sys_mutation_openFullscreen = 'sys_mutation_openFullscreen'

/**
 * 关闭全屏模式
 * 事件类型
 */
const sys_mutation_closeFullscreen = 'sys_mutation_closeFullscreen'

/**
 * 设置用户信息
 * 同步执行
 */
const sys_mutation_setUser = 'sys_mutation_setUser'

/**
 * 设置当前顶级菜单
 * 同步执行
 */
const sys_mutation_setCurrentMenu = 'sys_mutation_setCurrentMenu'

/**
 * 作者名称
 * 属性
 * 事件类型
 */
const sys_getter_authorName = 'sys_getter_authorName'
/**
 * 作者邮箱
 * 属性
 * 事件类型
 */
const sys_getter_authorEmail = 'sys_getter_authorEmail'
/**
 * 版权
 * 属性
 * 事件类型
 */
const sys_getter_copyright = 'sys_getter_copyright'
/**
 * 全屏隐藏
 * 属性
 * 事件类型
 */
const sys_getter_fullScreenHide = 'sys_getter_fullScreenHide'
/**
 * 全屏最大化
 * 属性
 * 事件类型
 */
const sys_getter_fullScreenMax = 'sys_getter_fullScreenMax'

export default {
	sys_action_openFullscreen,
	sys_action_closeFullscreen,
	sys_mutation_openFullscreen,
	sys_mutation_closeFullscreen,
	sys_mutation_setUser,
	sys_mutation_setCurrentMenu,
	sys_getter_authorName,
	sys_getter_authorEmail,
	sys_getter_copyright,
	sys_getter_fullScreenHide,
	sys_getter_fullScreenMax,
}