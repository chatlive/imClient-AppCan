import TYPES from './types'

/**
 * 我创建的群组
 * 属性
 */
const imchat_get_icreated = (state, getters) => {
	let groups = state.groups
		.filter(group => group.groupPosition === state.groupPosition.founder);
	return groups;
}

/**
 * 我加入的群组
 * 属性
 */
const imchat_get_ijoined = (state, getters) => {
	let groups = state.groups
		.filter(group => group.groupPosition !== state.groupPosition.founder);
	return groups;
}

const getters = {
	[TYPES.IMCHAT_GET_ICREATED]: imchat_get_icreated,
	[TYPES.IMCHAT_GET_IJOINED]: imchat_get_ijoined,
}

export default getters