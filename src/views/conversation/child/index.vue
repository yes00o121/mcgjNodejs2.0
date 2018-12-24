//贴吧主页面
<template>
  <div v-loading="loading">
      <div class="conversation-core">
          <childHeader ref="childHeader" :datas.sync = "datas"></childHeader>
          <div style="display: flex;">
            <div class="conversation-child-center-left">
              <!-- 楼层 -->
              <div v-for="(data,index) in floor.datas" class="conversation-floor" >
                <ul style="display:grid">
                  <li>
                      <div style="float: left;margin-left:20px;">
                          <el-button size="mini" style="height:25px">{{data.replyNumber}}</el-button>
                      </div>
                      <div style="padding-left: 80px;">
                        <div style="margin-bottom:5px;display: flex;">
                          <div style="width: 470px;">
                          <router-link  style="text-decoration:none;color:#2d64b3;font-size:14px;"  target="_blank" :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}">
                              {{data.title}}
                          </router-link>
                          </div>
                          <div style="font-size:12px;color:#999">{{data.createUserName}}</div>
                        </div>
                        <div  style="display: flex;">
                            <!-- 内容为追加显示 -->
                            <div v-bind:id = "'post_content_home_'+data.id" style="width:400px;font-size:14px;color:#666;line-height:24px;font-size:12px;"></div>
                            <div style="display: flex;font-size:12px;color:#999;padding-left: 68px;">
                                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:59px">
                                  <span >{{data.lastUserName}}</span>
                                </div>
                                <div>
                                    <span style="margin-left: 20px;">{{handlerDate(data.lastDate)}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 渲染内容 -->
                        <div v-html="conversationChildFilter(data.content)">

                        </div>
                        <div style="padding-top: 2px;font-size:12px;color:#999">
                            <img v-bind:src="imgUrl+data.photo" style="height: 15px;border-radius: 50%;">
                            <a href="#" style="color:#999;margin-left:5px;">{{data.userName}}</a>
                            <span style="padding-left:21px;">{{handlerDate(data.lastTime)}}</span>
                        </div>
                      </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="conversation-child-center-right">
              <centerRight :datas= "datas" ref="centerRight"></centerRight>
            </div>
          </div>
          <page ref="page" :currentPage = "parseInt(floor.start)"  @getPage= "getPage"></page>
          <div class="conversation-child--content-title">
              <div style="font-size:14px;padding-bottom:20px">发表新贴</div>
              <el-input placeholder="请输入标题" v-model="title"></el-input>
          </div>
          <wangEditor ref="wangEditor" @onPublish="publish"></wangEditor>
      </div>
      <login ref="login"></login>
  </div>
</template>
<script>
import replyPanel from '../../components/replyPanel'//回复面板组件
import login from '../../components/login'//登录组件
import page from '../../components/page'//分页组件
import wangEditor from '../../components/wangEditor'
import childHeader from './components/header'//头部面板
import centerRight from './components/centerRight'//主面板右侧信息
export default {
    data(){
      return {
          url : '/conversation/selectConversationById',//查询当前帖子的标题头像等内容
          floorUrl : '/conversationChild/selectConversationChildByConversationId',//当前贴吧的帖子(楼层)数据
          publishUrl : '/conversationChild/addConversationChild',//发布帖子的方法
          statisticsUrl : '/conversation/selectConversationStatistics',//获取用户发贴和关注量等数据
          datas : '',//贴吧名称当前贴子标题等数据
          backgroundUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',
          imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',//图片地址
          floor : {//帖子楼层数据
              datas : '',
              start : this.$route.query.start,//开始页,不能为0或负数
              limit : 10,//结束页
              total : '',
              imgs : []//贴子的图片，帖子可以有多张图片
          },
          title : '',//发贴的标题
          loading : true,//遮罩层
          id : this.$route.query.conversationId//当前贴吧的id
      }
    },
    mounted(){//加载页面数据
      this.init();//初始化页面数据
    },
    components : {replyPanel,login,page,wangEditor,childHeader,centerRight},//引入组件
    watch:{
            'floor.total'(val){//总数被修改时触发
                this.$refs.page.total = this.floor.total;//修改分页组件的总数
            },
            'floor.limit'(val){//页数,如需调整显示页数页进行更新
                this.$refs.page.size = val;//修改分页组件的总数
            }
    },
    created(){//dom渲染之后加载

    },
    methods : {
        init(){
          //this.$refs.page.currentPage = this.floor.start;//当前页
          this.$refs.page.size = this.floor.limit;//设置分页组件的页数
          this.getData();
          this.getfloorDatas();//获取楼层数据
        },
        bigImg(){
          //放大图片
          this.bigImg();
        },
        getData(){//获取贴吧名称当前贴子标题等数据
            var id = this.id;
            this.common.ajax({
                url : this.url,
                data : {
                    id,
                    token : this.getToken()
                },
                success : (result)=>{
                    if(result.success){
                        this.datas = result.result;
                        document.title= this.datas.conversationName;
                        //修改标题
                        this.loading = false;//关闭遮罩
                        //暂时先将当前贴吧数据写入localStorage
                        localStorage.setItem('currentConversation',JSON.stringify(this.datas));
                        this.loadingBackground();//加载背景图片
                        this.getStatistics();//加载关注发贴量等数据
                    }else{
                       //查询不到贴吧数据，跳转至错误页面
                       this.$router.push({
                        path : '/error'
                       })
                    }
                }
            })
        },
        getfloorDatas(){//获取楼层数据
          var conversationId = this.id;
          var start = this.floor.start;//开始页
          var limit = this.floor.limit;//页数
          this.common.ajax({
              url : this.floorUrl,
              data : {
                  conversationId,
                  start,
                  limit,
                  token : this.getToken()
              },
              success : (result)=>{
                  if(result.success){
                      this.floor.datas = result.result.conversationChilds;
                      this.floor.total = result.result.size;
                      //this.$nextTick(function(){
                      //    this.appendContent();
                      //})
                      //获取贴吧数据后进行吧主判断,判断是否为吧主，是否显示吧务按钮,由于数据datas的传值速度慢于子组件的加载速度，故延迟加载子组件的获取
                      setTimeout(()=>{
                        //判断用户是否登录
                        if(this.getUser()!= null)
                          this.$refs.centerRight.isMaster();
                      },100)
                  }else{
                    throw "加载失败";
                  }
              }
          })
        },
        publish(content){//发布方法,接收子组件数据
          if(!this.isLogin()){//判断用户是否登录
              return;//没有登录
          }
          if(this.title == '' || this.title == null){
            this.$alert('标题不能为空','提示');
            return;
          }
          this.addFloor(content,this.title);//发布楼层数据
        },
        addFloor(content,title){//添加楼层方法
            var user = this.getUser();//获取当前用户信息
            var conversationId = this.id;//获取当前帖子id
            //获取当前状态，判断是否楼主
            var isManage = 0;//默认不是
            if(user.id == this.datas.userId){
                isManage = 1;
            }
            this.common.ajax({
                url : this.publishUrl,
                type : 'post',
                data : {
                  conversationId,
                  userId : user.id,
                  content,
                  title,
                  token : user.token
                },
                success : (result)=>{
                    if(result.success){
                        //this.getfloorDatas();
                        location.reload();
                    }else{
                      if(result.state == 2){
                        this.$alert(result.message,'提示',{
                          callback:action=>{
                            this.reset();//清空并且刷新页面
                          }
                        });
                      }
                    }
                },
                error : ()=>{
                  throw "添加失败";
                }
            })
        },
        getPage(val){//获取子组件当前页数据
          location.href = '/conversationChild?conversationId='+this.id+''+'&start='+val//跳转到对应页数
        },
        updateFloor(val){

        },
        getStatistics(){//获取当前贴吧发帖量，用户关注量等数据
            this.common.ajax({
                url : this.statisticsUrl,
                data : {
                    id : this.datas.id,
                    token : this.getToken()
                },
                success : (result)=>{
                    if(result.success){
                        //数据追加到datas里
                      this.datas.followUserNumber = result.result.followUserNumber;
                      this.datas.publishNumber = result.result.publishNumber;
                    }else{
                        this.$alert(result.message,'提示')
                    }
                },
                error :()=>{
                  throw "查询错误"
                }
            });
        },
        loadingBackground(){//加载背景图片
            if(this.datas.background == '' || this.datas.background == null)
              return;
            $('#main').css('background-image','url('+this.backgroundUrl+this.datas.background+')')
            //如果图片id不为空进行加载
            //$('main').style.background-img
        }
    }
}

</script>
<style>
.conversation-core{
  background-color: white;
  padding:0px;
  width:90%;
  margin:0 auto;
  margin-top : 10px;
  border : 1px solid #DCDCDC;
}
.conversation-header{
    border-bottom: 1px solid #DCDCDC;
    height:330px;
    position:relative;
}
.conversation-header-top{
  height:70%;
}
.conversation-header-bottom{
  height:30%;
  background-color:#f9fafd
}
.conversation-title{
    padding : 10px;
    border-bottom: 1px solid #DCDCDC;
    background-color:white;
}
.conversation-floor{
    border-bottom : 1px solid #DCDCDC;
    position:relative;
}
.conversation-div-photo{
  width : 15%;
  height : 100%;
  text-align: center;
  font-size:12px;
  float : left;
  position:relative;
}
.louzhubiaoshi{
  background : url('/static/img/pb_css_pic_a630a08.png') no-repeat -172px -120px;
  height:36px;
  width:36px;
  position:absolute;
  right : 0;
}
.conversation-div-content{
  margin-left:30px;
  width : 77%;
  float : left;
  margin-top:20px;
}
.conversation-div-photo-img{
  width : 80px;
  height : 80px;
  padding:2px;
  border : 1px solid #DCDCDC;
}
.conversation-size{
    font-size:14px;
}
.conversation-floor-time{
  color : #999;
  position:absolute;
   right:10px; bottom:15px;
   font-size:12px;
}
.conversation-photo{
width : 150px;
height:150px;
padding: 4px;
background : white;
border: 1px solid #DCDCDC;
}
.conversation-child-header-bottom{
  position:absolute;
  bottom:20px;
  left:20px;
}
.conversation-child-content{
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  /*padding-top: 15px;*/
  width: 80%;
  height:45px;
  overflow: hidden;
}
.conversation-create-user{
    position: absolute;
    right: 0%;
    padding-top: 20px;
    font-size: 12px;
    padding-right: 100px;
}
.conversation-last-user{
    position: absolute;
    right: 0%;
    padding-top: 52px;
    font-size: 12px;
    padding-right: 100px;
}
.conversation-child--content-title{
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 50px;
  margin-bottom: -20px;
}
.conversation-child-center-left{
  width:75%;border-right: 1px solid #E9E9EB
}
.conversation-child-center-right{
  border-bottom: 1px solid #E9E9EB;
  width: 25%;
}
</style>
