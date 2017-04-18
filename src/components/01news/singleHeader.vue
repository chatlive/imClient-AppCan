<template>
	<div class="ui secondary  menu">
		<div class="left menu">
			<div class="item ">
				<button class="ui icon basic button" @click="backOff"><i class="left arrow icon"></i></button>
			</div>
		</div>

		<div class="center menu">
			<div class="item">
				{{ chatName }}
			</div>
		</div>

		<div class="right menu">
			<div class="item">
				<button class="ui icon basic button" @click="history"><i class="wait icon"></i></button>
				<button class="ui icon basic button" @click="singleInfo"><i class="user icon"></i></button>
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
		name: 'singleHeader',
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
				alert("发送测试图片消息！");
				//				sendFunction.sendpicTest("http://192.168.30.32:9090/Upload_Img/a867af89b70a4eef9c84cfe0e77b6522.jpg");
			},
			singleInfo: function() {

				let newSession = clone(this.$store.state.imchat.currentSession);
				router.push({ name: 'SingleInfo', params: newSession });
			},
			history: function() {
				let chatId = this.$store.state.imchat.currentSession.chatId;
				CHAT.History.his_SingleHistory({
					chatId: chatId,
					msgId: this.lastMsgId,
				});
			},
			backOff: function() {
				// 调用浏览器的后退功能
				//window.history.go(-1);
				//router.go(-1);
				router.push({ name: 'News' });
			}
		}
	}
</script>
<style>

</style>