<template>
	<div class="ui secondary  menu">
		<div class="left menu">
			<div class="item ">
				<button class="ui icon basic button" @click="backOff"><i class="left arrow icon"></i></button>
			</div>
		</div>

		<div class="center menu">
			<div class="item">
				群聊-{{ chatName }}
			</div>
		</div>

		<div class="right menu">
			<div class="item">
				<!--<button class="ui icon basic button" @click="testCamera"><i class="treatment icon"></i></button>-->
				<button class="ui icon basic button" @click="history"><i class="wait icon"></i></button>
				<button class="ui icon basic button" @click="groupInfo"><i class="users icon"></i></button>
			</div>
		</div>
	</div>
</template>
<script>
	import clone from 'clone'
	import router from 'router/index'
	import CHAT from 'api/imService'
	import upload from 'api/appCan/upload'
	import jsonBC from 'api/appCan/jsonBC'
	import sendFunction from 'api/appCan/sendFunction'

	export default {
		name: 'groupHeader',
		computed: {
			chatName() {
				let currentSession = this.$store.state.imchat.currentSession;
				return currentSession.chatName;
			},
			lastMsgId() {
				let session = this.$store.state.imchat.sessions.find(item =>
					item.sessionType === this.$store.state.imchat.currentSession.sessionType &&
					item.chatId === this.$store.state.imchat.currentSession.chatId);

				let msgId = session.messages[0].id;
				return msgId;
			}
		},
		methods: {
			testCamera: function() {
				sendFunction.sendTest("测试!!!");
			},
			getMembers: function() {
				let model = {
					groupId: this.$store.state.imchat.currentSession.chatId
				};
				CHAT.GroupManage.gM_GroupInfo(model);
			},
			groupInfo: function() {
				this.getMembers();
				let newSession = clone(this.$store.state.imchat.currentSession);
				router.push({
					name: 'GroupInfo',
					params: newSession
				});
			},
			history: function() {
				let chatId = this.$store.state.imchat.currentSession.chatId;
				CHAT.History.his_GroupHistory({
					chatId: chatId,
					msgId: this.lastMsgId,
				});
			},
			backOff: function() {
				router.push({
					name: 'News'
				});
			}
		}
	}
</script>
<style>

</style>