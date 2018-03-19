import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'
import homeBody from '../views/home/home-body'
import conversationChildChild from '../views/conversation/childChild'//帖子组件
import conversationChild from '../views/conversation/child'//贴吧组件
import personalCenter from '../views/conversation/personalCenter'//个人中心组建
import master from '../views/conversation/master'//吧务管理组件
import masterConversationManage from '../views/conversation/master/panel/conversationManage'//吧务贴子组件
import masterPageSetting from '../views/conversation/master/panel/pageSetting'//吧务页面管理组件
import masterUserManage from '../views/conversation/master/panel/userManage'//吧务吧员管理组件
import error from '../views/components/error'//页面错误组件
import manga from '../views/home/mangaHome'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    //{
  //    redirect : '/home',
    //  path : '/'
    //},
    {
      path: '/',
      name : 'home',
      component: home,
      children : [
        {
          path: '/',//首页内容组件
          name : 'homeBody',
          component: homeBody,
        },
        {
          path: '/conversationChild',//贴吧主页面
          name : 'conversationChild',
          component: conversationChild,
      },{
      path: '/conversationChildChild',//帖子主页面
      name : 'conversationChildChild',
      component: conversationChildChild,
    },{
    path: '/personalCenter',//帖子主页面
    name : 'personalCenter',
    component: personalCenter
  },{//吧务管理页面
    path : '/master',
    name : 'master',
    component:master,
    children:[/*{//子面板
        path : '/master',//界面管理
        name : 'pageSetting',
        component : masterPageSetting
    },*/{//子面板
        path : '/master',//界面管理
        name : 'pageSetting',
        mode: 'history',
        component : resolve => require(['../views/conversation/master/panel/pageSetting'], resolve),//懒加载
    },{
      path : '/master/conversationManage',//贴子管理管理
      name : 'conversationManage',
      component : masterConversationManage
    },{
      path : '/master/userManage',//吧员管理
      name : 'userManage',
      component : masterUserManage
    }]
  }]
},{
  //隐藏的漫画页面
  path : '/manga',
  name : 'manga',
  component : manga
},{
  path : '/error',
  name : 'error',
  meta : {
      title : '找不到页面'
  },
  component:error
}
  ]
})
