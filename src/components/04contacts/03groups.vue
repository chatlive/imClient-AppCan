<template>
	<div>
		<Basepage>
			<span slot="head_title">我的群组</span>

			<button class="ui basic button" slot="head_right" @click="group_Create">
				创建群聊
			</button>

			<div slot="body_content">
				<div class="ui top attached tabular two item menu">
					<a v-bind:class="{ active: isActive1 }" class=" item " data-tab="first " @click="nav_Icreated ">我创建的</a>
					<a v-bind:class="{ active: isActive2 }" class="item" data-tab="second" @click="nav_Ijoined">我加入的</a>
				</div>
				<div v-bind:class="{ active: isActive1 }" class="ui bottom attached tab segment" data-tab="first">
					<Icreated></Icreated>
				</div>
				<div v-bind:class="{ active: isActive2 }" class="ui bottom attached tab segment" data-tab="second">
					<Ijoined></Ijoined>
				</div>
			</div>
		</Basepage>
	</div>
</template>
<script>
	import Basepage from 'components/basePage'
	import Icreated from 'components/04contacts/groups/iCreated'
	import Ijoined from 'components/04contacts/groups/iJoined'
	import router from 'router/index'

	export default {
		name: 'groups',
		data: function() {
			return {
				isActive1: true,
				isActive2: false
			}
		},
		components: {
			Basepage,
			Icreated,
			Ijoined,
		},
		methods: {
			group_Create() {
				router.push({ name: 'GroupCreate' });
			},
			nav_Icreated() {
				this.isActive1 = true;
				this.isActive2 = false;
			},
			nav_Ijoined() {
				this.isActive1 = false;
				this.isActive2 = true;
			},
		},
	}
</script>
<style>

</style>