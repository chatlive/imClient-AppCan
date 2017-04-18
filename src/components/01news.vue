<template>
	<!--<div>消息</div>-->
	<div id="news">
		<div class="contacts_bg ui celled selection list">

			<div class="item " v-for="session in sessions" @click="nav(session.chatId,session.chatName,session.chatImg,session.sessionType)">
				<div class="right floated content" v-show="!(session.unreadMsgCount===0)">
					<button class="circular mini ui icon red button">
						{{session.unreadMsgCount}}
					</button>
				</div>
				<img v-if="session.sessionType===sessionType_single" class="ui mini circular image" :src="session.chatImg" />
				<div v-if="session.sessionType===sessionType_group" class="ui avatar image">
					<button class=" ui circular orange icon button">
						<i class="users icon"></i>
					</button>
				</div>
				<div class="middle aligned content">
					<div class="header">{{session.chatName}}</div>
					<p>
						<span class="im_msg">
						[{{getNewTime(session.chatterTime)}}] {{getNewMsg(session.messages)}}
						</span>
					</p>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import dateFormat from 'dateFormat'
	import { mapMutations } from 'vuex'
	import router from 'router/index'
	import SYSTEMTYPES from 'store/modules/system/types'

	export default {
		name: 'news',
		computed: {
			sessions() {
				return this.$store.state.imchat.sessions;
			},
			sessionType_single: function() {
				return this.$store.state.imchat.sessionType.single;
			},
			sessionType_group: function() {
				return this.$store.state.imchat.sessionType.group;
			},
		},
		methods: {
			nav: function(account, name, img, sessionType) {

				let newSession = {
					sessionId: '',
					sessionType: sessionType,
					chatId: account,
					chatName: name,
					chatImg: img
				};
				if(sessionType === this.sessionType_single) {

					router.push({
						name: 'SingleChat',
						params: newSession
					});

				} else if(sessionType === this.sessionType_group) {

					router.push({
						name: 'GroupChat',
						params: newSession
					});

				} else {}

			},
			getNewTime: function(date) {
				if(typeof date === 'string') {
					//去除T并转换为Date格式
					date = new Date(date.replace('T', ' '));
				}
				let isToday = dateFormat(date, "yyyy-mm-dd") === dateFormat(new Date(), "yyyy-mm-dd");
				if(isToday) {
					return dateFormat(date, "HH:MM");
				} else {
					return dateFormat(date, "yyyy-mm-dd HH:MM");
				}
			},
			getNewMsg: function(messages) {
				let message = (messages.length > 0) ?
					messages[messages.length - 1] :
					null;
				if(message != null) {
					let desc = '';
					switch(message.msgType) {
						case this.$store.state.imchat.msgType.TEXT:
							desc = (message.msgBody.length > 20) ?
								(message.msgBody.substr(0, 15) + '...') :
								message.msgBody;
							break;
						case this.$store.state.imchat.msgType.IMG:
							desc = '[图片]';
							break;
						case this.$store.state.imchat.msgType.FILE:
							desc = '[文件]';
							break;
					}
					return desc;
				} else {
					return '';
				}
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
	#news {
		padding-top: 0.5rem;
	}
	
	.im_msg {
		width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.contacts_bg {
		background-color: white;
	}
</style>