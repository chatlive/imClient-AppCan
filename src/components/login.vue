<template>
	<div class="hello">
		<div class="ui middle aligned center aligned grid">
			<div class="column">
				<h1 class="ui center aligned icon header">
					<i class="circular dashboard icon"></i> 
					<div class="content">
						Student Cloud
					</div>
				</h1>
				<br/>
				<div>
					<div class="ui fluid big left icon input">
						<input type="text" placeholder="IM账号" v-model="loginAccount">
						<i class="user icon"></i>
					</div>
					<br/>
					<div class="ui fluid big left icon input">
						<input type="password" placeholder="密码" v-model="loginPassword">
						<i class="lock icon"></i>
					</div>
					<br/>
					<div class="ui fluid transparent icon input">
						<button :disabled="btnEnable" class="fluid big ui blue button" @click="login">登录</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import TYPES from 'store/modules/system/types'
	import baseUrl from 'api/baseUrl'
	import APPAPPCAN from 'api/appAppCan'
	import router from 'router/index'
	import CHAT from 'api/imService'

	export default {
		name: 'login',
		components: {},
		data() {
			return {
				loginAccount: '',
				loginPassword: '',
				btnEnable: false
			}
		},
		computed: {
			...mapGetters({
				sys_fullScreenHide: TYPES.sys_getter_fullScreenHide,
			})
		},
		methods: {
			...mapMutations({
				open: TYPES.sys_mutation_openFullscreen,
				close: TYPES.sys_mutation_closeFullscreen,
				setUser: TYPES.sys_mutation_setUser,
			}),
			login: function() {
				this.btnEnable = true;
				let loginUser = {
					'account': this.loginAccount,
					'password': this.loginPassword
				};
				this.$http.get(baseUrl.loginUrl, { params: loginUser })
					.then(this.loginCallback)
					.catch((response) => {
						console.log(response)
					});
			},
			loginCallback: function(response) {
				let data = response.data;
				if(data.status) {
					this.btnEnable = true;
					var user = {
						account: data.user.account,
						name: data.user.name,
						img: data.user.img
					}
					this.savePassword();
					this.setUser(user);
					CHAT.initialize(this.$store.state.system.user.account, this.successCallback);
					this.close();
					router.push('news');
				} else {
					this.btnEnable = false;
					alert(data.msg);
				}
				console.log(data);
			},
			successCallback: function() {
				CHAT.FriendGroup.fG_GetGroups();
				CHAT.FriendGroup.fG_GetFriends();
				CHAT.Chatter.chatter_ChatterInfo();
				APPAPPCAN.init();
			},
			savePassword: function() {
				localStorage.setItem('loginAccount', this.loginAccount);
				localStorage.setItem('loginPassword', this.loginPassword);
			},
			getPassword: function() {
				this.loginAccount = localStorage.getItem('loginAccount');
				this.loginPassword = localStorage.getItem('loginPassword');
			},
			clearPassword: function() {
				localStorage.removeItem('loginAccount');
				localStorage.removeItem('loginPassword');
			},
		},
		created() {
			this.getPassword();
		},
	}
</script>

<style>
	.hello {
		padding: 1rem;
		width: 100%;
		height: 100%;
		background: white;
		/*background-color: #DADADA;*/
	}
	
	.hello>.grid {
		height: 100%;
	}
	
	.hello .image {
		margin-top: -100px;
	}
	
	.hello .column {
		max-width: 450px;
	}
</style>