import baseConfig from '../../config/baseConfig'
import common from './common'
export default {
     websocket : null,
     init(){
       //初始化前判断用户会话是否过期
       common.ajax({
         url : '/user/selectUserIsEffective',
         async : false,//同步
         success : (res)=>{
            console.log(res)
            if(!res.success){
               //用户会话过期,清空localStorage.clear()
               this.$alert('用户登录超时,请重新登录','提示',{
                   confirmButtonText: '确定',
                   callback: action => {
                       localStorage.clear();//清空用户
                       location.reload();
                   }
               })
            }
         }
       })
       //页面重新加载时判断用户登录状态，创建websocket连接
       var user = localStorage.user == null ? null : JSON.parse(localStorage.user);
       if(user != null){
         //创建webSocket连接
         this.websocket = new WebSocket(baseConfig.websocket+user.token);
       }else{
         return;//退出
       }

       this.websocket.onclose=function(){//连接关闭监听
           console.log('websocket连接关闭');
       }
       this.websocket.onmessage = function(event){//接收消息方法
           console.log('websocket接收消息');
       }
       //连接响应
       this.websocket.onopen = function(){
         console.log('websocket连接达成');
       }
       this.websocket.onerror = function(){
         console.log('websocket错误');
       }
       window.onbeforeunload = ()=>{
          if(this.websocket != null){
              this.websocket.close();
          }
       }
     }
     /*
     window.onbeforeunload = function(){
       console.log('关闭')
       console.log(websocket)
       if(websocket != null){
           console.log('达成。。')
           websocket.close();
       }
   }*/
}
/*
//静态方法工具类
var websocket = null;
//得到websocket连接
  //websocket = new websocket('ws：//'+baseConfig.localhost+'/websocket');


  //加载websocket连接
  function initWebSocketConnection(){
    //页面重新加载时判断用户登录状态，创建websocket连接
    var user = localStorage.user == null ? null : JSON.parse(localStorage.user);
    if(user != null){
      //创建webSocket连接
      websocket = new WebSocket(baseConfig.websocket+user.token);
    }else{
      return;//退出
    }

    websocket.onclose=function(){//连接关闭监听
        console.log('websocket连接关闭');
    }
    websocket.onmessage = function(event){//接收消息方法
        console.log('websocket接收消息');
        console.log(event)
        console.log(vue)
    }
    //连接响应
    websocket.onopen = function(){
      console.log('websocket连接达成');
    }
    websocket.onerror = function(){
      console.log('websocket错误');
    }
  }
window.onbeforeunload = function(){
  console.log('关闭')
  console.log(websocket)
  if(websocket != null){
      console.log('达成。。')
      websocket.close();
  }
};
function send(message){//发送给服务器消息的方法
  websocket.send(message);
}
*/
