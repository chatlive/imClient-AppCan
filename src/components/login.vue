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
	import STORE from 'store/index'
	import router from 'router/index'
	import loginService from 'api/loginService'

	export default {
		name: 'login',
		components: {},
		data() {
			return {
				loginAppKey: '00000000-0000-0000-0000-000000000000',
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
			}),
			getParam: function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null)
					return(r[2]);
				return null;
			},
			login: function() {
				this.btnEnable = true;
				loginService.login(this.loginAppKey, this.loginAccount, this.page_Callback);
			},
			urlLogin: function() {

				let appkey = this.getParam("appkey");
				let account = this.getParam("account");

				if(appkey != null && account != null && appkey.length === 36) {

					console.log(`urlLogin...登录开始,appkey=${appkey},account=${account}`);
					this.loginAppKey = appkey;
					loginService.login(appkey, account, this.page_Callback);
				} else {
					console.log(`urlLogin...登录失败,appkey=${appkey},account=${account}`);
				}
			},
			page_Callback: function(data) {
				if(data.status) { //登录成功
					this.btnEnable = true;
					this.savePassword();
					this.close();
					router.push('news');
				} else { //登录失败
					this.btnEnable = false;
					console.log(data.msg);
					//					alert(data.msg);
				}
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

			console.log(`login_created`);
			this.urlLogin();
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