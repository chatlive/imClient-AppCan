<template>
	<div id="app">
		<div id="appheader" v-show="sys_fullScreenHide">
			<apphead></apphead>
		</div>

		<div id="appbody" :class="{appbodyFullScreen:sys_fullScreenMax}">
			<router-view></router-view>
			<!--<help></help>-->
		</div>

		<div id="appfooter" v-show="sys_fullScreenHide">
			<appfoot></appfoot>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Apphead from 'components/apphead';
	import Appfoot from 'components/appfoot';
	import Help from 'components/help/help';
	import TYPES from 'store/modules/system/types';
	export default {
		name: 'app',
		computed: {
			...mapGetters({
				sys_fullScreenHide: TYPES.sys_getter_fullScreenHide,
				sys_fullScreenMax: TYPES.sys_getter_fullScreenMax,
			}),
		},
		components: {
			Apphead,
			Appfoot,
			Help,
		},
	}
</script>

<style>
	body {
		font-size: 1rem;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		overflow: hidden;
	}
	
	#app {}
	
	#appheader {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background-color: dodgerblue;
		padding: 0;
		color: #EEEEEE;
		font-size: 1.2rem;
		text-align: center;
		font-weight: bold;
	}
	
	#appbody {
		position: fixed;
		z-index: 1;
		top: 3rem;
		bottom: 5rem;
		left: 0;
		width: 100%;
		background-color: #CCCCCC;
		overflow-y: scroll;
	}
	
	.appbodyFullScreen {
		top: 0 !important;
		bottom: 0 !important;
	}
	
	#appfooter {
		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		line-height: 5rem;
		background-color: #444444;
		padding: 0;
		font-size: 1.2rem;
		text-align: center;
		border-top: 1px solid #444444;
	}
</style>