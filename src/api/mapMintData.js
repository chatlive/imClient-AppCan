const mapOptionsMemebers = function(members) {
	let options = [];

	for(let member of members) {
		options.push({
			label: member.name,
			value: member.account,
			disabled: true
		});
	}
	return options;
}

const mapOptionsFriends = function(friends) {
	let options = [];

	for(let friend of friends) {
		options.push({
			label: friend.name,
			value: friend.account,
			disabled: false
		});
	}
	return options;
}

/**
 * 映射 Checklist 数据
 * @param {Array[Object]} items - 待映射对象数组.
 * @param {String} label - 待映射label.
 * @param {String} value - 待映射value.
 * @param {Boolean} disabled - 待映射disabled.
 */
const mapOptions_Checklist = function(items, label, value, disabled) {
	let options = [];

	for(let item of items) {
		//eval("item." + key)
		options.push({
			label: eval("item." + label),
			value: eval("item." + value),
			disabled: disabled
		});
	}
	return options;
}

/**
 * 映射薄荷UI组件数据
 */
const mapMintData = {
	mapOptions_Checklist,
};

export default mapMintData