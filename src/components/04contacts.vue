<template>
	<div class="padding_top " id="contacts">

		<div class="contacts_bg ui middle aligned celled selection list">
			<div class="item" @click="nav_Friends">
				<div class="ui avatar image">
					<button class=" ui circular blue icon button">
						<i class="user icon"></i>
					</button>
				</div>
				<div class="content ">
					<div class="header">聊天好友</div>
				</div>
			</div>
		</div>

		<div class="contacts_bg ui middle aligned celled selection list">
			<div class="item" @click="nav_PhoneDirectory">
				<div class="ui avatar image">
					<button class=" ui circular teal icon button">
						<i class="call icon"></i>
					</button>
				</div>
				<div class="content">
					<div class="header">手机通讯录</div>
				</div>
			</div>
		</div>

		<div class="contacts_bg ui middle aligned celled selection list">
			<div class="item" @click="nav_Groups">
				<div class="ui avatar image">
					<button class=" ui circular orange icon button">
						<i class="users icon"></i>
					</button>
				</div>
				<div class="content">
					<div class="header">我的群组</div>
				</div>
			</div>
		</div>

		<div class="contacts_bg ui middle aligned celled selection list">
			<div class="item" @click="nav_CompanyOrg">
				<div class="ui avatar image">
					<button class=" ui circular brown icon button">
						<i class="sitemap icon"></i>
					</button>
				</div>
				<div class="content">
					<div class="header">组织机构</div>
				</div>
			</div>
		</div>

		<div>
			<Topcontacts></Topcontacts>
		</div>

	</div>
</template>
<script>
	import router from 'router/index'
	import Topcontacts from 'components/04contacts/05topContacts'
	import { mapMutations } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'

	export default {
		name: 'contacts',
		components: {
			Topcontacts,
		},
		methods: {
			nav_Friends: function() {
				router.push({ name: 'Friends' });
			},
			nav_PhoneDirectory: function() {
				router.push({ name: 'PhoneDirectory' });
			},
			nav_Groups: function() {
				router.push({ name: 'Groups' });
			},
			nav_CompanyOrg: function() {
				router.push({ name: 'CompanyOrg' });
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
	#contacts {}
	
	.padding_top {
		padding-top: 0.5rem;
	}
	
	.contacts_bg {
		background-color: white;
	}
</style>