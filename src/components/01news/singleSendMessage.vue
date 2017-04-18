<template>
	<div class="ui fluid action input">
		<input type="text" placeholder="请输入内容..." v-model="content" @keyup.enter="sendmsg" v-focus='true'>
		<div class="ui green button" @click="sendmsg">发送</div>
	</div>
</template>
<script>
	import generator from 'node-uuid-generator'
	import { mapActions } from 'vuex'
	import CHAT from 'api/imService'
	import TYPES from 'store/modules/imchat/types'

	export default {
		name: 'singleSendMessage',
		data() {
			return {
				content: ''
			}
		},
		methods: {
			sendmsg() {
				if(this.content.trim() === '') {
					return;
				} else {
					let msg = this.genMsg();
					CHAT.Single.single_SendText(msg);
					this.send(msg);
					this.content = '';
				}
			},
			genMsg() {
				let uuid = generator.generate(); //
				let msg = {
					id: '',
					msgClientId: uuid,
					from_UserId: this.$store.state.system.user.account,
					to_UserId: this.$store.state.imchat.currentSession.chatId,
					msgTime: new Date(),
					isRead: false,
					msgType: this.$store.state.imchat.msgType.TEXT,
					msgBody: this.content,
					success: true,
				};
				return msg;
			},
			...mapActions({
				send: TYPES.IMCHAT_ACTION_SENDMESSAGE
			})
		},
		directives: {
			focus: {
				inserted: function(el, { value }) {
					//被绑定元素插入父节点时调用
					if(value) {
						el.focus();
					}
				}
			}
		},
	}
</script>
<style>

</style>