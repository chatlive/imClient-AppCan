<template>
	<div id="singleMessage" class="message">
		<div v-if="session">
			<div class="msg-item" v-for="item in session.messages">
				<div class="time">
					<span>{{item.msgTime | time}}</span>
				</div>
				<div class="main" :class="{ self: item.from_UserId == user.account }">
					<img class="avatar" width="30" height="30" :src="item.from_UserId == user.account ? user.img : toUser.img" />

					<div class="text" v-if="item.msgType === msgType_TEXT" v-html="dingdingface(item.msgBody)">
					</div>

					<div class="img" v-else-if="item.msgType === msgType_IMG">
						<img class="ui rounded fluid image" :src="item.msgBody" @click='imgShow(item.msgBody)' width="100%" height="100%">
					</div>

					<div class="file" v-else-if="item.msgType === msgType_FILE" @click='fileShow(item.msgBody)'>
						<div class="ui basic label">
							<i class="tag icon"></i> {{getFileDesc(item.msgBody)}}
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import dateFormat from 'dateFormat'
	import emojson from 'api/appCan/emojson'
	import dingdingface from 'api/appCan/dingdingface'
	import img_Show from 'api/appCan/img_show'
	import file_show from 'api/appCan/file_show'
	import download_file from 'api/appCan/download_file'

	export default {
		name: 'singleMessage',
		data() {
			return {
				timePre: null,
			}
		},
		computed: {
			user() {
				return this.$store.state.system.user;
			},
			toUser() {
				let friends = this.$store.state.imchat.friends;
				let user = friends.find(friend => friend.account === this.currentSession.chatId);
				return user;
			},
			session() {
				let sessions = this.$store.state.imchat.sessions;
				let session = sessions.find(item =>
					item.sessionType === this.currentSession.sessionType &&
					item.chatId === this.currentSession.chatId
				);
				return session;
			},
			currentSession() {
				return this.$store.state.imchat.currentSession;
			},
			msgType_TEXT() {
				return this.$store.state.imchat.msgType.TEXT;
			},
			msgType_IMG() {
				return this.$store.state.imchat.msgType.IMG;
			},
			msgType_FILE() {
				return this.$store.state.imchat.msgType.FILE;
			},
		},
		methods: {
			emojicons(msgText) {
				let stremo = msgText;
				let reg = /\[([^\]]+)\]/g;
				stremo = stremo.replace(reg, function($1) {
					return emojson.emoarr[$1] || $1;
				});
				return stremo;
			},
			dingdingface(msgText) {
				let stremo = msgText;
				let reg = /\[[^\]]+\]/gi;
				stremo = stremo.replace(reg, function(code) {
					let face = dingdingface.emoarr.find(face =>
						face.name === code.substring(1, code.length - 1));
					if(face != undefined) {
						let tpl = `<img src='${face.src}' width='24px' height='24px'>`;
						return tpl;
					} else {
						return code;
					}
				});
				return stremo;
			},
			imgShow(imgPath) {
				img_Show.img_Show(imgPath);
			},
			fileShow(imgPath) {
				file_show.file_Show(imgPath);
			},
			getFileDesc(filePath) {
				let fileName = file_show.getExtensionNameByPath(filePath);
				return fileName;
			},
			chatTime(date) {
				if(typeof date === 'string') {
					//去除T并转换为Date格式
					date = new Date(date.replace('T', ' '));
				}
				var timeDesc = chatMsgTime(date.getTime());
				console.log('systemTime2:' + timeDesc);
				return timeDesc;
			},
			chatMsgTime(timestamp) {
				//是否，发送消息
				let isSend = timestamp === null;
				//当前时间
				let current = (new Date).getTime();
				//是否显示
				let isAdd = isSend ?
					(current - (this.timePre || 0) > 6e4) :
					(timestamp - (this.timePre || 0) > 6e4);
				if(isAdd) {
					let systemTime = isSend ?
						dateFormat(timestamp, "mm-dd HH:MM") :
						dateFormat(timestamp, "yyyy-mm-dd HH:MM");
					this.timePre = isSend ? current : timestamp;
					console.log('systemTime1:' + systemTime);
					return systemTime;
				} else {
					return '';
				}
			},
		},
		filters: {
			/**
			 * 日期过滤
			 */
			time(date) { //vue渲染时有问题，用chatTime
				if(typeof date === 'string') {
					//去除T并转换为Date格式
					date = new Date(date.replace('T', ' '));
				}
				let isToday = dateFormat(date, "yyyy-mm-dd") === dateFormat(new Date(), "yyyy-mm-dd");
				if(isToday) {
					return dateFormat(date, "mm-dd HH:MM");
				} else {
					return dateFormat(date, "mm-dd HH:MM");
				}
			}
		},
		updated: function() {
			let el = this.$el;
			el.scrollTop = el.scrollHeight;
			//			console.log(`singleMessage.vue滚动条`);
		},
	}
</script>

<style lang="less" scoped>
	.message {
		height: ~'calc(100%)';
		padding: 10px 15px;
		overflow-y: scroll;
		.msg-item {
			margin-bottom: 15px;
		}
		.time {
			margin: 7px 0;
			text-align: center;
			>span {
				display: inline-block;
				padding: 0 18px;
				font-size: 12px;
				color: #fff;
				border-radius: 2px;
				background-color: #dcdcdc;
			}
		}
		.avatar {
			float: left;
			margin: 0 10px 0 0;
			border-radius: 3px;
		}
		.text {
			display: inline-block;
			position: relative;
			padding: 0 10px;
			max-width: ~'calc(100% - 40px)';
			min-height: 30px;
			line-height: 2.5;
			font-size: 12px;
			text-align: left;
			word-break: break-all;
			background-color: #fafafa;
			border-radius: 4px;
			&:before {
				content: " ";
				position: absolute;
				top: 9px;
				right: 100%;
				border: 6px solid transparent;
				border-right-color: #fafafa;
			}
		}
		.img {
			display: inline-block;
			position: relative;
			/*	padding: 0 10px;*/
			padding: 8px;
			max-width: ~'calc(50% - 40px)';
			min-height: 30px;
			/*line-height: 2.5;*/
			font-size: 12px;
			text-align: left;
			word-break: break-all;
			background-color: #fafafa;
			/*border-radius: 4px;*/
			border-radius: 4px;
			&:before {
				content: " ";
				position: absolute;
				top: 9px;
				right: 100%;
				border: 6px solid transparent;
				border-right-color: #fafafa;
			}
		}
		.file {
			display: inline-block;
			position: relative;
			padding: 0 10px;
			max-width: ~'calc(100% - 40px)';
			min-height: 30px;
			line-height: 2.5;
			font-size: 12px;
			text-align: left;
			word-break: break-all;
			background-color: #fafafa;
			border-radius: 4px;
			&:before {
				content: " ";
				position: absolute;
				top: 9px;
				right: 100%;
				border: 6px solid transparent;
				border-right-color: #fafafa;
			}
		}
		.self {
			text-align: right;
			.avatar {
				float: right;
				margin: 0 0 0 10px;
			}
			.text {
				background-color: #b2e281;
				&:before {
					right: inherit;
					left: 100%;
					border-right-color: transparent;
					border-left-color: #b2e281;
				}
			}
			.img {
				background-color: #b2e281;
				&:before {
					right: inherit;
					left: 100%;
					border-right-color: transparent;
					border-left-color: #b2e281;
				}
			}
			.file {
				background-color: #b2e281;
				&:before {
					right: inherit;
					left: 100%;
					border-right-color: transparent;
					border-left-color: #b2e281;
				}
			}
		}
	}
</style>