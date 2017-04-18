import Vue from 'vue'
import STORE from 'store/index'
import Router from 'vue-router'
import SYSTEM_TYPES from 'store/modules/system/types'
//一级导航
import Login from 'components/login'
import Hello from 'components/hello'
import News from 'components/01news'
import Ding from 'components/02ding'
import Work from 'components/03work'
import Contacts from 'components/04contacts'
import Mime from 'components/05mine'
//二级导航-聊天
import SingleChat from 'components/01news/singleChat'
import GroupChat from 'components/01news/groupChat'
import SingleInfo from 'components/01news/singleInfo'
import GroupInfo from 'components/01news/groupInfo'

//二级导航-联系人
import Friends from 'components/04contacts/01friends'
import PhoneDirectory from 'components/04contacts/02phoneDirectory'
import Groups from 'components/04contacts/03groups'
import CompanyOrg from 'components/04contacts/04companyOrg'
//import TopContacts from 'components/04contacts/05topContacts'
import GroupCreate from 'components/04contacts/groups/groupCreate'
import GroupMembers from 'components/04contacts/groups/groupMembers'
import MemberAdd from 'components/04contacts/groups/memberAdd'
import MemberRemove from 'components/04contacts/groups/memberRemove'
Vue.use(Router)

/**
 * 导航路由
 */
var navRoutes = [{
		path: '/',
		name: 'Index',
		component: Login
	},
	{
		path: '/Login',
		name: 'Login',
		component: Login
	}, {
		path: '/Hello',
		name: 'Hello',
		component: Hello
	}, {
		path: '/News',
		name: 'News',
		component: News
	}, {
		path: '/Ding',
		name: 'Ding',
		component: Ding
	}, {
		path: '/Work',
		name: 'Work',
		component: Work
	}, {
		path: '/Contacts',
		name: 'Contacts',
		component: Contacts
	}, {
		path: '/Mime',
		name: 'Mime',
		component: Mime
	},
];

/**
 * 消息路由
 */
var _01news = [{
	path: '/SingleChat',
	name: 'SingleChat',
	component: SingleChat,
	//	beforeEnter: (to, from, next) => {
	//		console.log("SingleChat路由独享钩子beforeEnter");
	//		next();
	//	}
}, {
	path: '/GroupChat',
	name: 'GroupChat',
	component: GroupChat,
}, {
	path: '/SingleInfo',
	name: 'SingleInfo',
	component: SingleInfo,
}, {
	path: '/GroupInfo',
	name: 'GroupInfo',
	component: GroupInfo,
}, ];

/**
 * 联系人路由
 */
var _04contacts = [{
		path: '/Friends',
		name: 'Friends',
		component: Friends,
	}, {
		path: '/PhoneDirectory',
		name: 'PhoneDirectory',
		component: PhoneDirectory,
	}, {
		path: '/Groups',
		name: 'Groups',
		component: Groups,
	}, {
		path: '/CompanyOrg',
		name: 'CompanyOrg',
		component: CompanyOrg,
	},
	//{
	//	path: '/TopContacts',
	//	name: 'TopContacts',
	//	component: GroupChat,
	//}, 
	{
		path: '/GroupCreate',
		name: 'GroupCreate',
		component: GroupCreate,
	}, {
		path: '/GroupMembers',
		name: 'GroupMembers',
		component: GroupMembers,
	}, {
		path: '/MemberAdd',
		name: 'MemberAdd',
		component: MemberAdd,
	}, {
		path: '/MemberRemove',
		name: 'MemberRemove',
		component: MemberRemove,
	},
];

/**
 * 整合路由
 */
var allRouters = navRoutes.concat(_01news).concat(_04contacts);

var router = new Router({
	routes: allRouters
});

router.beforeEach((to, from, next) => {
	console.log("全局路由钩子beforeEach:" + to.path);
	let isLogin = to.path === "/" || to.path === "/Login";
	if(STORE.state.system.user.account === "" && !isLogin) {
		//没有登录则跳转到登录页面
		console.log("全局路由钩子beforeEach:没有登录");
		next('/Login');
	} else {
		let menu = STORE.state.system.menus.find(m => m.id === to.name);
		if(menu) {
			STORE.commit(SYSTEM_TYPES.sys_mutation_setCurrentMenu, menu);
		}
	}
	next();
});

export default router;