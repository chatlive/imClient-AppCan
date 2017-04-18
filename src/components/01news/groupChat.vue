<template>
	<div>
		<div id="chatheader">
			<Groupheader></Groupheader>
		</div>
		<div id="chatbody" :style="chatbody">
			<Groupmessage></Groupmessage>
		</div>
		<div id="chatfooter" :style="chatfooter">
			<!--<Groupsendmessage></Groupsendmessage>-->
		</div>
	</div>
</template>
<script>
	import { mapMutations } from 'vuex'
	import Groupheader from 'components/01news/groupHeader'
	import Groupmessage from 'components/01news/groupMessage'
	import Groupsendmessage from 'components/01news/groupSendMessage'
	import SYSTEMTYPES from 'store/modules/system/types'
	import IMCHATTYPES from 'store/modules/imchat/types'
	import CHAT from 'api/imService'
	import APPAPPCAN from 'api/appAppCan'

	export default {
		name: 'groupChat',
		components: {
			Groupheader,
			Groupmessage,
			Groupsendmessage,
		},
		computed: {
			chatbody() {
				let styleObj = {};
				return styleObj;
			},
			chatfooter() {
				let styleObj = {};
				return styleObj;
			},
		},
		methods: {
			openInputBar: function() {
				APPAPPCAN.open();
				APPAPPCAN.getInputBarHeight();
			},
			...mapMutations({
				open: SYSTEMTYPES.sys_mutation_openFullscreen,
				close: SYSTEMTYPES.sys_mutation_closeFullscreen,
				setCurrentSession: IMCHATTYPES.IMCHAT_MUTATION_SETCURRENTSESSION,
				clearCurrentSession: IMCHATTYPES.IMCHAT_MUTATION_CLEARCURRENTSESSION
			}),
		},
		created() {
			this.open();
		},
		destroyed() {
			//			this.close();
			this.clearCurrentSession();
			APPAPPCAN.close();
		},
		beforeRouteEnter(to, from, next) {
			//重置未读消息数为0
			CHAT.Chatter.chatter_ResetUnreadMsg({
				chatId: to.params.chatId,
				sessionType: to.params.sessionType
			});

			next(vm => {
				let newSession = {
					sessionId: to.params.sessionId,
					sessionType: to.params.sessionType,
					chatId: to.params.chatId,
					chatName: to.params.chatName,
					chatImg: to.params.chatImg
				};
				vm.setCurrentSession(newSession);
				vm.openInputBar();
			})
		},
	}
</script>
<style>
	#chatheader {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background-color: dodgerblue;
		padding: 0 .35714286em;
		color: #EEEEEE;
		font-size: 1.2rem;
		text-align: center;
		font-weight: bold;
	}
	
	#chatbody {
		position: absolute;
		z-index: 1;
		top: 3rem;
		bottom: 3rem;
		left: 0;
		width: 100%;
		background-color: #CCCCCC;
		overflow: hidden;
	}
	
	.chatbody {}
	
	#chatfooter {
		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background-color: #CCCCCC;
		padding: 0;
		font-size: 1.2rem;
		text-align: center;
		border-top: 1px solid #CCCCCC;
	}
	
	.chatfooter {}
</style>