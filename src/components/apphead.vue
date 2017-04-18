<template>
	<div>校友 云{{menuName}}</div>
</template>
<script>
	export default {
		name: 'apphead',
		computed: {
			menuName() {
				let name = this.$store.state.system.currentMenu.name;
				let menuName = name === '' ? '' : (' - ' + name);
				return menuName;
			}
		}
	}
</script>
<style>

</style>