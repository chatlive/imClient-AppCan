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
						群组-{{backOffParams.chatName}}
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
			<div class="ui styled accordion">
				<div class="title" :class="{ active: isActive }" @click="showMembers">
					<i class="dropdown icon"></i> 群成员：{{count}}人
				</div>
				<div class="content" :class="{ active: isActive }">
					<div class="ui attached basic segment">
						<div class="ui tiny horizontal list">
							<div class="item" v-for="member in members">
								<img class="ui mini circular image" :src="member.img">
								<div class="content">
									<div class="header">{{member.name}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ui bottom attached right aligned basic segment">
						<button class="ui circular icon button " :class="{ disabled: isMember }" @click="addMember">
								<i class="add icon"></i>
							</button>
						<button class="ui circular icon button" :class="{ disabled: isMember }" @click="minusMember">
								<i class="minus icon"></i>
							</button>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>
<script>
	import _ from 'lodash'
	import mapMintData from 'api/mapMintData'
	import clone from 'clone'
	import router from 'router/index'
	import { mapMutations, mapActions } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'

	export default {
		name: 'groupInfo',
		data() {
			return {
				isActive: true,
				backOffParams: null,
			};
		},
		computed: {
			account() {
				return this.$store.state.system.user.account;
			},
			isMember() {
				//群管理员有添加删除人权限，群组员没有添加删除人权限
				let isManager = this.group.groupPosition === this.$store.state.imchat.groupPosition.founder;
				return !isManager
			},
			group() {
				let group = this.$store.state.imchat.groups.find(item => item.groupId === this.backOffParams.chatId);
				return group;
			},
			members() {
				return this.group.members;
			},
			friends() {
				return this.$store.state.imchat.friends;
			},
			count() {
				return this.members.length;
			},
		},
		methods: {
			mapOptions_Add: function(members, friends) {
				let _members = mapMintData.mapOptions_Checklist(members, 'name', 'account', true);
				let _friends = mapMintData.mapOptions_Checklist(friends, 'name', 'account', false);

				let options = _.unionBy(_members, _friends, 'value');
				return options;
			},
			mapOptions_Minus: function(members, account) {
				let _members = mapMintData.mapOptions_Checklist(members, 'name', 'account', false);
				let member = _members.find(item => item.value === account);
				member.disabled = true;
				return _members;
			},
			addMember: function() {
				this.backOffParams.options = this.mapOptions_Add(clone(this.members), clone(this.friends));
				router.push({ name: 'MemberAdd', params: this.backOffParams });
			},
			minusMember: function() {
				this.backOffParams.options = this.mapOptions_Minus(clone(this.members), this.account);
				router.push({ name: 'MemberRemove', params: this.backOffParams });
			},
			showMembers: function() {
				this.isActive = !this.isActive;
			},
			backOff: function() {
				router.push({ name: 'GroupChat', params: this.backOffParams });
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