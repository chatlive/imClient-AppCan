import types from './types'

/**
 * imChat_actionAA
 * 异步分发
 */
const imChat_actionAA = ({ state, commit, rootState }, payload) => {
	console.log("imChat_actionAA");
	console.log(payload);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			commit(types.IMCHAT_MUTATIONAA, payload)
			resolve()
		}, 1000);
	});
}

/**
 * imChat_actionBB
 * 异步分发
 */
const imChat_actionBB = ({ state, commit, rootState }, payload) => {
	console.log("imChat_actionBB");
	console.log(payload);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			commit(types.IMCHAT_MUTATIONBB, payload)
			resolve()
		}, 1000);
	});
}

export default {
	imChat_actionAA,
	imChat_actionBB
}