<template>
	<div id="help">
		<loading v-show="showLoading"></loading>

		<Modeldialog v-show="showDialog"></Modeldialog>
	</div>
</template>

<script>
	import Loading from 'components/help/loading'
	import Modeldialog from 'components/help/modelDialog'

	export default {
		name: 'help',
		data() {
			return {
				showLoading: this.$store.state.system.showLoading,
				showDialog: this.$store.state.system.showDialog,
				errorCode: this.$store.state.system.errorCode
			}
		},
		components: {
			Loading,
			Modeldialog,
		}
	}
</script>

<style>

</style>