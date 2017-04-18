<template>
	<div>
		<Basepage>
			<button class="ui icon basic button" slot="head_left" @click="backOff">
				<i class="left arrow icon"></i>
			</button>

			<div slot="head_title">群组创建</div>

			<button class="ui icon basic button" slot="head_right" @click="">
				<i class="left anchor icon"></i>
			</button>

			<div slot="body_content" id="groupCreate">
				<div class="ui aligned center aligned grid">
					<div class="column">
						<h2 class="ui teal image header">
							群组创建
					   </h2>
						<form class="ui large form">
							<div class="ui stacked segment">
								<div class="field">
									<div class="ui labeled input">
										<div class="ui label">
											群聊编号：
										</div>
										<input type="text" v-model="groupId" placeholder="请输入群聊编号">
									</div>
								</div>
								<div class="field">
									<div class="ui labeled input">
										<div class="ui label">
											群聊名称：
										</div>
										<input type="text" v-model="groupName" placeholder="请输入群聊名称">
									</div>
								</div>
								<button type="button" :disabled="btnEnable" class="ui fluid blue submit button" @click="createGroup">
									创建
								</button>
							</div>
							<div class="ui active error message" :class="{errorMsg:showError}">
								{{errorMsg}}
							</div>
						</form>
					</div>
				</div>
			</div>
		</Basepage>
	</div>
</template>
<script>
	import Basepage from 'components/basePage'
	import router from 'router/index'
	import CHAT from 'api/imService'

	export default {
		name: 'groupCreate',
		components: {
			Basepage,
		},
		data() {
			return {
				groupId: '',
				groupName: '',
				btnEnable: false,
				showError: false,
				errorMsg: '错误信息！'
			}
		},
		methods: {
			backOff: function() {
				router.push({ name: 'Groups' });
			},
			createGroup: function() {
				let group = {
					groupId: this.groupId.trim(),
					groupName: this.groupName.trim()
				};

				if(group.groupId == "" || group.groupName == "") {

					this.showError = true;
					this.errorMsg = '群聊名称或群聊编号不可以为空!';
				} else {

					this.btnEnable = true;
					CHAT.GroupManage.gM_Create(group, this.createGroupcb);
				}
			},
			createGroupcb: function(data) {

				this.showError = true;
				this.groupId = '';
				this.groupName = '';

				if(data.success) {
					this.btnEnable = true;
					this.errorMsg = data.msg;
					CHAT.FriendGroup.fG_GetGroups();
					this.backOff();
				} else {
					this.btnEnable = false;
					this.errorMsg = data.msg;
				}
			},
		}
	}
</script>
<style>
	#groupCreate {
		padding: 1rem;
		width: 100%;
		height: 100%;
		/*background: white;*/
		background-color: #DADADA;
	}
	
	#groupCreate>.grid {
		height: 100%;
	}
	
	#groupCreate .image {
		margin-top: -100px;
	}
	
	#groupCreate .column {
		/*max-width: 450px;*/
	}
	
	#groupCreate .errorMsg {
		display: block;
	}
</style>