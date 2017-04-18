import TYPES from './types'

/**
 * 开启全屏模式
 * 异步分发
 */
const sys_action_openFullscreen = ({ commit }) => {
	commit(TYPES.sys_mutation_openFullscreen);
}

/**
 * 关闭全屏模式
 * 异步分发
 */
const sys_action_closeFullscreen = ({ commit }) => {
	commit(TYPES.sys_mutation_closeFullscreen);
}

export default {
	[TYPES.sys_action_openFullscreen]: sys_action_openFullscreen,
	[TYPES.sys_action_closeFullscreen]: sys_action_closeFullscreen,
}