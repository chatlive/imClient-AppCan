<template>
	<div id="basePage">
		<div class="baseheader">
			<div class="ui secondary menu">
				<div class="left menu">
					<div class="item ">
						<button class="ui icon basic button" @click="backOff">
								<i class="left arrow icon"></i>
							</button>
					</div>
				</div>

				<div class="center menu">
					<div class="item">
						好友-{{backOffParams.chatName}}
					</div>
				</div>

				<div class="right menu">
					<div class="item ">
						<button class="ui icon basic button">
								<i class="left anchor icon"></i>
							</button>
					</div>
				</div>
			</div>
		</div>

		<div class="basebody">
			<br />
			<div class="ui centered card">
				<div class="content">
					<div class="right floated meta">
						账号：{{backOffParams.chatId}}
					</div>
					昵称：{{backOffParams.chatName}}
				</div>
				<div class="ui small centered image">
					<img :src="backOffParams.chatImg">
				</div>
				<div class="ui bottom attached button" @click="backOff">
					<i class="comment icon"></i> 发送消息
				</div>
			</div>
		</div>

	</div>

</template>
<script>
	import router from 'router/index'
	import { mapMutations, mapActions } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'

	export default {
		name: 'singleInfo',
		data() {
			return {
				backOffParams: null
			};
		},
		methods: {
			backOff: function() {
				router.push({ name: 'SingleChat', params: this.backOffParams });
			},
			...mapMutations({
				open: SYSTEMTYPES.sys_mutation_openFullscreen,
				close: SYSTEMTYPES.sys_mutation_closeFullscreen,
			}),
		},
		created() {
			this.open();
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				let newSession = {
					sessionId: to.params.sessionId,
					sessionType: to.params.sessionType,
					chatId: to.params.chatId,
					chatName: to.params.chatName,
					chatImg: to.params.chatImg
				};
				vm.backOffParams = newSession;
			})
		},
	}
</script>
<style>
	.baseheader {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: calc(100%);
		height: 3rem;
		line-height: 3rem;
		background-color: dodgerblue;
		padding: 0 .35714286em;
		color: #EEEEEE;
		font-size: 1.2rem;
		text-align: center;
		font-weight: bold;
	}
	
	.basebody {
		position: absolute;
		z-index: 1;
		top: 3rem;
		bottom: 0rem;
		left: 0;
		width: 100%;
		background-color: #CCCCCC;
		overflow-y: scroll;
	}
	
	.basefooter {
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
</style>