/**
 * getterAA
 * 属性
 */
const getterAA = (state, getters, rootState) => {
	console.log("getterAA");
	return "getterAA:" + state.stateAA
}

/**
 * getterBB
 * 属性
 */
const getterBB = (state, getters, rootState) => {
	console.log("getterBB");
	return "getterBB:" + state.stateBB
}

export default {
	getterAA,
	getterBB
}