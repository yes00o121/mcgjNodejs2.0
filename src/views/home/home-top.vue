<template>
  <div>
  <el-header style="height:40px;z-index: 100;position: fixed;width:100%">
    <div>
      <div>
          <el-input v-model="query" placeholder="请输入内容" class="el-input-style" size="mini">
              <el-button slot="prepend" @click="toHome">首页</el-button>
              <el-button slot="append" icon="el-icon-search" @click.stop="queryConverstation"></el-button>
          </el-input>
      </div>
    </div>
    <!-- 登录的top -->
    <div v-if="login" class="right-alignment">
        <el-dropdown size="mini" :hide-on-click="false" @command="handleCommand">
          <span class="el-dropdown-link">
          {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">
            <router-link :to="{path:'/personalCenter'}">
              个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item command="2">创建贴吧</el-dropdown-item>
          <el-dropdown-item command="3">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown style="margin-left:10px" size="mini" :hide-on-click="false" @command="replyEvent">
          <span class="el-dropdown-link">
          消息<el-badge id="message" style="visibility:hidden;" is-dot></el-badge><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 暂时隐藏评论功能 -->
            <el-dropdown-item command="1" class="clearfix" style="display:none">
              评论
              <el-badge class="mark" :value="0" />
            </el-dropdown-item>
            <el-dropdown-item command = "2" class="clearfix" >
              回复
              <el-badge class="mark" :value="reply" />
            </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <createConversation ref="createConversation"></createConversation>
    </div>
    <!-- 没有登录的top -->
    <div v-else="login" class="right-alignment">
      <a class="word-color" href="#" @click="openLogin">登录</a>
      <login ref="login"></login>
      <span class="word-color" >|</span>
      <a class="word-color" href = "#">注册</a>
    </div>
    </el-header>
  </div>
</template>
<script>
import baseConfig from '../../../config/baseConfig'
import login from '../components/login'//引入登录窗口组件
import createConversation from '../conversation/addConversation'//创建贴吧窗口组件
export default {
    data(){
        return {
            activeIndex : '1',
            login : false,//用户是否登录，判断加载不同的头部,默认未登录
            user : '',//当前的user对象
            query : '',//查询数据
            queryUrl : '/conversation/selectConversationByName',//查询路径
            messageUrl : '/user/selectUserUnreadMessageCountByUserId',//获取当前用户没有查看的消息
            reply : 0,//回复数量
            activeName : 'home',//个人中心要显示的面板名称，默认为首页
            emptyReplyUrl : '/conversationChildChild/updateConversationChildChildReplyByUerId'//清空未读消息
        }
    },
    mounted : function(){//判断当前用户的登录状态来显示不同的头部
        var _this = this;
        if(localStorage.user != null){
            this.login = true;//用户已经登录显示登录头部
            this.loadMessage();//加载用户消息状态
            //获取当前的user对象
            this.user = JSON.parse(localStorage.user)
            //websocket.initWebSocketConnection();
            var websocket = new WebSocket(baseConfig.websocket+'?token='+this.getToken());
            websocket.onclose=function(){//连接关闭监听
                console.log('websocket连接关闭');
            }
            websocket.onmessage = function(event){//接收消息方法
                console.log('websocket接收消息');
                console.log(event)
                _this.showDot();
                _this.$message(JSON.parse(event.data).message)
            }
            //连接响应
            websocket.onopen = function(){
              console.log('websocket连接达成');
            }
            websocket.onerror = function(){
              console.log('websocket错误');
            }
            window.onbeforeunload = function(){
              if(websocket != null){
                  console.log('达成。。')
                  websocket.close();
              }
            };
        }
        /******************************************************************/

    },
    methods : {
        loadMessage(){//加载用户消息状态
            //判断用户是否登录
            if(login){
                $.ajax({
                    url : this.messageUrl,
                    data : {
                        userId : this.getUser().id
                    },
                    success : (result)=>{
                        if(result.success){
                              var res = result.result;
                              console.log(res)
                              for(let i = 0;i<res.length;i++){
                                  if(res[i].message != 0){
                                    this.showDot();
                                  }
                                  if(res[i].msgType == 'reply'){//处理回复数据
                                      console.log('接收消息成功'+res[i])
                                      this.reply = res[i].message;
                                  }
                              }
                        }else{
                            throw "消息加载错误";
                        }
                    },
                    error : (result)=>{
                        throw "消息加载错误";
                    }
                })
            }
        },
        hiidenDot(){//隐藏原点图标方法
            document.getElementById('message').lastElementChild.style.visibility="hidden"

        },
        showDot(){//显示原点图标方法
            document.getElementById('message').lastElementChild.style.visibility="visible"
            this.reply++;
        },
        queryConverstation(){//查询贴吧方法
            if(this.query == null || this.query == ''){
                this.$alert('请输入搜索关键词','提示');
                return;
            }
            //如果用户输入的关键词是漫画，跳转至漫画页面
            if(this.query == '漫画'){
              this.$router.push({
                  path : '/manga'
              })
              return;
            }
            this.common.ajax({
                url : this.queryUrl,
                data : {
                    conversationName : this.query
                },
                success : (result)=>{
                  if(!result.success){
                      this.$alert(result.message,'提示');
                  }else{
                    //跳转
                    location.href = "/conversationChild?conversationId="+result.result.id+'&start=1';
                  }
                }
            })
        },
        openLogin(){//打开登录窗口
            this.$refs.login.dialogVisible = true;
        },
        logout(){//退出方法
            localStorage.clear();//清除localStorage
            this.toHome();
            location.reload();//重新加载页面
        },
        handleCommand(command){//下拉选择方法
            //根据用户点击的不同触发不同的功能
            if(command == 1){//个人中心

            }
            if(command == 2){
                this.$refs.createConversation.dialogVisible = true;//显示创建贴吧窗口
            }
            if(command == 3){//退出
              this.logout();
            }
        },
        toHome(){
          //this.$router.push({
          //  path : '/'
          //})
          //location.reload();//重新加载页面
          location.href = '/';
        },
        replyEvent(event){//回复事件
            if(event == 1){

            }
            if(event == 2){//回复页面
                if(this.reply == 0){//如果没有消息回复直接跳转页面
                  this.$router.push({
                      path : '/personalCenter'
                  })
                }else{//不然将用户的未读消息全部清空
                    this.emptyReply();
                }
            }
        },
        emptyReply(){//清空用户未读消息
            $.ajax({
                url : this.emptyReplyUrl,
                type : 'post',
                data : {
                    token : this.getToken(),
                    userId : this.getUser().id
                },
                success : (result)=>{
                    if(result.success){
                      this.reply = 0;//清空用户未读的数据个数
                      this.activeName = "message";//跳转的面板名称
                      this.hiidenDot();//隐藏提示红点
                      //跳转至个人中心的消息面板
                      this.$router.push({
                          path : '/personalCenter'
                      })
                    }else{
                      //清空人员未读数据出现异常
                      this.$alert(result.message,'提示');
                    }
                },
                error : ()=>{
                    throw "清空未读数据异常"
                }
            })
        }
    },
    components : {login,createConversation}
}
</script>
<style>
.right-alignment{
  float:right;
  margin-right: 20px;
}
.word-color{
  color : blue;
}
.home-top-menu{
  height : 40px;
  backgrond-color : red;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .home-top-background{
      background-color:red;
  }
  .el-header, .el-footer {
      border-bottom:1px solid #DCDCDC;
      margin:0px;
      padding:0px;
      background-color: white;
      color: #333;
      text-align: center;
      line-height: 40px;
      margin:-8px;
    }
.el-input-style{
  float: left;
  width: 20%;
  margin-left: 40%;
  margin-top: 6px;
}
</style>
