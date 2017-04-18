<template>
	<div class="hello">
		<div>
			<button v-if="sys_fullScreenHide" class="ui icon grey button" @click="open">
				<i class="expand icon"></i>
			</button>
			<button v-else class="ui icon grey button" @click="close">
				<i class="compress icon"></i>
			</button>
		</div>
		<h1>{{ hello }}</h1>
		<h2>北京时间：{{msg}}</h2>
	</div>
</template>

<script>
	import dateFormat from 'dateFormat'
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import TYPES from '../store/modules/system/types'

	var now = new Date()
	const currentDate = dateFormat(now, "yyyy-mm-dd HH:MM:ss")

	export default {
		name: 'hello',
		data() {
			return {
				msg: currentDate
			}
		},
		computed: {
			hello() {
				return this.$store.state.system.hello;
			},
			...mapGetters({
				sys_fullScreenHide: TYPES.sys_getter_fullScreenHide,
			}),
		},
		methods: {
			...mapMutations({
				open: TYPES.sys_mutation_openFullscreen,
				close: TYPES.sys_mutation_closeFullscreen,
			}),
		},
	}
</script>

<style>
	.hello {
		padding: 1rem;
	}
</style>