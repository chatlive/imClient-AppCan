<template>
	<div>
		<br />
		<div class="ui centered card">

			<div class="content">
				<div class="right floated meta">账号：{{account}}</div>
				昵称：{{name}}
			</div>
			<div class="ui small centered image">
				<img :src="img">
			</div>
			<div class="extra">

			</div>
			<div class="ui bottom attached button" @click="quit">
				<i class="power red icon"></i> 退出系统
			</div>
		</div>

	</div>
</template>
<script>
	import { mapMutations } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'
	import APPAPPCAN from 'api/appAppCan'

	export default {
		name: 'mime',
		computed: {
			account() {
				return this.$store.state.system.user.account;
			},
			img() {
				return this.$store.state.system.user.img;
			},
			name() {
				return this.$store.state.system.user.name;
			}
		},
		methods: {
			quit: function() {
				APPAPPCAN.quit();
			},
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