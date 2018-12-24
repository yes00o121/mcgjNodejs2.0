import Vue from 'vue'
import App from './App.vue'
import router from './router'//路由
import Element from 'element-ui'//引用elementui
import E from 'wangeditor'//富文本框
import 'element-ui/lib/theme-chalk/index.css'//elementui 样式
import baseConfig from '../config/baseConfig'//配置
import common from './util/common'//通用工具
import filters from './util/filter.js'//引入全局过滤器
import './util/overallMethod.js'//引入全局方法

Vue.use(Element)
Vue.use(router);
Vue.prototype.baseConfig = baseConfig;//设置全局配置文件
Vue.prototype.common = common;//设置全局公共类
router.beforeEach((to,form,next)=>{//路由拦截
  //跳转页面前清空背景图片
  $('#main').css('background-image','')
  if(to.name == null){//如果页面不存在跳转至错误页面
    router.push({
        name : 'error'
    })
  }
  next();
})
router.afterEach(()=>{//页面跳转之后触发

})

/******************************************* 全局方法 ***************************************************************/

Vue.prototype.isLogin=function(){//全局方法，判断用户是否登录
  var user = localStorage.user;
  if(user != null && user != '' && user.substring(0,1)=='{' && user.substring(user.length,user.length-1) == '}'){
    //localStorage.user数据正常没有被用户修改过
    return true;
  }else{
    //用户没有登录,打开登录窗口
     this.$alert('请先登录!','提示');
     localStorage.clear();//重置用户
     //this.$refs.login.dialogVisible = true;
     //login.dialogVisible = true;
     return false;
  }
}
//时间处理方法
Vue.prototype.handlerDate =function(date){

  if(date == null || isNaN(date)){
      //return "数据异常";
      return null;
  }
  var time = new Date(date);
  //判断时间是否在今天内
  if(new Date().getYear() == time.getYear() && new Date().getMonth() == time.getMonth() && new Date().getDate() == time.getDate()){
      //获取时间进行小时和分钟的判断
      if(new Date().getTime()-time.getTime()<3600000){
        //在一小时内,计算出分钟数后返回
        return parseInt((new Date().getTime()-time.getTime())/1000/60)+"分钟前";
      }
      //不是一小时内的时间，获取小时候返回
      return parseInt((new Date().getTime()-time.getTime())/1000/60/60)+"小时前";
  }else{
    //时间不在今天,获取日期后返回
    return time.getMonth()+1+'-'+time.getDate();
  }
}
//将user的值写入localStorage中
Vue.prototype.setUser = function(user){
    localStorage.setItem("user",JSON.stringify(user));
}
//获取localStorage中的user数据
Vue.prototype.getUser = function(){
    return localStorage.user == null ? null : JSON.parse(localStorage.user);
}

//获取localStorage中的conversation数据
Vue.prototype.getConversation = function(){
    return localStorage.currentConversation == null ? null : JSON.parse(localStorage.currentConversation);
}
//获取当前用户的token
Vue.prototype.getToken = function(){
    return localStorage.user == null ? null : JSON.parse(localStorage.user).token;
}
//重置页面，清空用户的数据并且刷新页面
Vue.prototype.reset = function(){
    localStorage.clear();
    location.reload();
}
//initWebSocketConnection();//创建webSocket连接
/********************************************** 全局方法 ************************************************************/
console.log('!!')
console.log(filters)
var vm = new Vue({
  el: '#app',
  router,
  filters,
  render: h => h(App)
})

window.aa = vm;
