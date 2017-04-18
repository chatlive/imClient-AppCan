<template>
	<div id="_appfoot">
		<div class="ui labeled icon inverted three item menu">
			<a class="item " @click="nav(menu.id)" v-for="menu in menus">
				<i :class="[menu.icon,'icon']" class=""></i> {{menu.name}}
			</a>
		</div>
	</div>
</template>
<script>
	import router from 'router/index'

	export default {
		name: 'appfoot',
		computed: {
			menus() {
				return this.$store.state.system.menus;
			}
		},
		methods: {
			nav: function(menu) {
				// 命名的路由
				router.push({ name: menu });
			}
		}

	}
</script>
<style>
	/*#_appfoot {
		height: 100%;
	}*/
</style>