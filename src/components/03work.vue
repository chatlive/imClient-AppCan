<template>
	<div>红圈营销</div>
</template>
<script>
	import { mapMutations } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'
	
	export default {
		name: 'work',
		methods: {
			...mapMutations({
				open: SYSTEMTYPES.sys_mutation_openFullscreen,
				close: SYSTEMTYPES.sys_mutation_closeFullscreen,
			}),
		},
		created() {
			this.close();
		},
	}
</script>
<style>

</style>