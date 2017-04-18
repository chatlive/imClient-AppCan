<template>

	<div class="contacts_bg ui celled selection list">
		<div class="item" v-for="group in groups" @click="nav(group.groupId,group.groupName)">
			<div class="ui avatar image">
				<button class=" ui circular orange icon button">
					<i class="users icon"></i>
				</button>
			</div>
			<div class="middle aligned content">
				<div class="header">
					{{group.groupName}}
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import router from 'router/index'
	import IMCHATTYPES from 'store/modules/imchat/types'
	import { mapGetters } from 'vuex'

	export default {
		name: 'icreated',
		computed: {
			//			groups: function() {
			//				//			let groups = this.$store.state.imchat.groups
			//				//				.filter(group => group.groupPosition === this.$store.state.imchat.groupPosition.founder);
			//				//			return groups;
			//				return this.get_groups;
			//			},			
			sessionType_group: function() {
				return this.$store.state.imchat.sessionType.group;
			},
			...mapGetters({
				groups: IMCHATTYPES.IMCHAT_GET_ICREATED
			})
		},
		methods: {
			nav: function(account, name) {
				let newSession = {
					sessionId: '',
					sessionType: this.sessionType_group,
					chatId: account,
					chatName: name,
					chatImg: ''
				};
				router.push({ name: 'GroupChat', params: newSession });
			},
		},
	}
</script>
<style>
	.contacts_bg {
		background-color: white;
	}
</style>