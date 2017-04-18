import types from './types'

/**
 * IMCHAT_MUTATIONAA
 * 同步执行
 */
const IMCHAT_MUTATIONAA = (state, payload) => {
	console.log("imChat_mutationAA");
	console.log(payload);
	state.stateAA = "mutationAA:"
}

/**
 * IMCHAT_MUTATIONBB
 * 同步执行
 */
const IMCHAT_MUTATIONBB = (state, payload) => {
	console.log("imChat_mutationBB");
	console.log(payload);
	state.stateBB = "mutationBB:"
}

export default {
	IMCHAT_MUTATIONAA,
	IMCHAT_MUTATIONBB
}