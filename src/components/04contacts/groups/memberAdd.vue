<template>
	<div id="basePage">
		<div class="baseheader">
			<div class="ui secondary menu">
				<div class="left menu">
					<div class="item ">
						<slot name="head_left">
							<button class="ui icon basic button" @click="backOff">
								<i class="left arrow icon"></i>
							</button>
						</slot>
					</div>
				</div>

				<div class="center menu">
					<div class="item">
						<slot name="head_title">群组成员-添加</slot>
					</div>
				</div>

				<div class="right menu">
					<div class="item ">
						<slot name="head_right">
							<button class="ui icon basic button">
								<i class="left anchor icon"></i>
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>

		<div class="basebody">
			<slot name="body_content">
				<div>
					<mt-cell :title="checkedCount">
						<mt-button size="small" type="primary" @click.native="save">添加</mt-button>
					</mt-cell>
				</div>
				<mt-checklist class="page-part" title="选择列表" v-model="value2" :options="options2">
				</mt-checklist>
			</slot>
		</div>

	</div>

</template>
<script>
	import router from 'router/index'
	import { mapMutations, mapActions } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'
	import IMCHATTYPES from 'store/modules/imchat/types'
	import CHAT from 'api/imService'

	export default {
		name: 'memberAdd',
		data() {
			return {
				backOffParams: null,
				options2: [],
				value2: [],
			}
		},
		computed: {
			checkedCount() {
				let msg = `已选择: ${this.value2.length} 人`;
				return msg;
			},
			friends() {
				let friends = this.$store.state.imchat.friends;
				return friends;
			},
		},
		methods: {
			save: function() {
				let model = {
					groupId: this.backOffParams.chatId,
					accounts: this.value2
				};
				CHAT.GroupManage.gM_AddUsers(model);
				let groupInfo = this.saveBefore(model.groupId, model.accounts);
				this.memberAdd(groupInfo);
				this.backOff();
			},
			saveBefore: function(groupId, accounts) {
				let groupInfo = {
					groupId: groupId,
					members: []
				};
				for(let account of accounts) {
					let friend = this.friends.find(item => item.account === account);
					let member = {
						account: friend.account,
						groupPosition: this.$store.state.imchat.groupPosition.memeber,
						img: friend.img,
						name: friend.name
					};
					groupInfo.members.push(member);
				}
				return groupInfo;
			},
			backOff: function() {
				router.push({
					name: 'GroupInfo',
					params: this.backOffParams
				});
			},
			...mapMutations({
				open: SYSTEMTYPES.sys_mutation_openFullscreen,
				close: SYSTEMTYPES.sys_mutation_closeFullscreen,
				memberAdd: IMCHATTYPES.IMCHAT_MUTATION_MEMBERADD,
			})
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
				vm.options2 = to.params.options;
			})
		}
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