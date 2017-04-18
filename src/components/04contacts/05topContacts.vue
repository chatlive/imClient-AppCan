<template>
	<div>
		<div class="padding_top">
			<div class="contacts_bg ui celled selection list">

				<div class="item">
					<div class="ui avatar image">
						<button class=" ui circular olive icon button">
						<i class="spy icon"></i>
					</button>
					</div>
					<div class="middle aligned content">
						<div class="header">常用联系人</div>
					</div>
				</div>

				<div class="item" v-for="friend in friends" @click="nav(friend.account,friend.name,friend.img)">
					<div class="right floated content">
						<div class="ui button">
							···
						</div>
					</div>
					<img class="ui mini circular image" :src="friend.img" />
					<div class="middle aligned content">
						<div class="header">{{friend.name}}
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	//	import Basepage from 'components/basePage'
	import { mapState, mapGetters } from 'vuex'
	import router from 'router/index'

	export default {
		name: 'topcontacts',
		//		components: {
		//			Basepage,
		//		},
		computed: {
			friends: function() {
				return this.$store.state.imchat.friends;
			},
			sessionType_single: function() {
				return this.$store.state.imchat.sessionType.single;
			}
		},
		methods: {
			nav: function(account, name, img) {
				let newSession = {
					sessionId: '',
					sessionType: this.sessionType_single,
					chatId: account,
					chatName: name,
					chatImg: img
				};
				router.push({ name: 'SingleChat', params: newSession });
			},
		},
	}
</script>
<style>

</style>