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
						<slot name="head_title">标题</slot>
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
			<slot name="body_content">内容</slot>
		</div>

		<!--<div class="basefooter">
			<slot name="footer_content"></slot>
		</div>-->

	</div>

</template>
<script>
	import router from 'router/index'
	import { mapMutations, mapActions } from 'vuex'
	import SYSTEMTYPES from 'store/modules/system/types'

	export default {
		name: 'basePage',
		methods: {
			backOff: function() {
				router.push({ name: 'Contacts' });
			},
			...mapMutations({
				open: SYSTEMTYPES.sys_mutation_openFullscreen,
				close: SYSTEMTYPES.sys_mutation_closeFullscreen,
			}),
		},
		created() {
			this.open();
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