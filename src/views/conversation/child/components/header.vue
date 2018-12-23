//贴吧页面头部面板
<template>
  <div>
    <div class="conversation-header">
      <div class="conversation-header-top" >
          <img v-if="datas.cardBanner != null && datas.cardBanner != ''" v-bind:src='imgUrl+datas.cardBanner' style="width:100%;height:100%">
          <span  v-if="datas.cardBanner == null || datas.cardBanner == ''">
            <img class="img" v-bind:src="getSystemConfig('conversation.card')">
          </span>
      </div>
      <div class="conversation-header-bottom">
          <div style="padding-top: 10px;">
            <a href="#" style="text-decoration: none;margin-left: 24%;font-size: 22px;color:black">
              {{datas.conversationName}}吧
            </a>
            <img v-if="follow" style="cursor: pointer;height:20px;text-decoration: none;margin-left:10px;" src="../../../../../static/img/followAfter.png" @click="cancelFollow">
            <img v-else="follow" style="cursor: pointer;height:20px;text-decoration: none;margin-left:10px;" src="../../../../../static/img/follow.png" @click="addFollow">
            <span style="margin-left:20px;font-size:12px;">关注&nbsp;:<span style="color:#ff7f3e;margin-left:5px;">{{datas.followUserNumber}}</span></span>
            <span style="margin-left:20px;font-size:12px;">贴子&nbsp;:<span style="color:#ff7f3e;margin-left:5px;">{{datas.publishNumber}}</span></span>
            <div style="height:20px;margin-left:24%;font-size:14px;margin-top:5px;">{{datas.autograph}}</div>
          </div>
      </div>
      <div class="conversation-child-header-bottom">
      <img v-bind:src="imgUrl+datas.photo" class="conversation-photo">
      </div>
    </div>
    <div class="conversation-title">
        <a href="#">{{datas.title}}</a>
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
          imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',//图片url
          follow : false,//用户是否关注贴吧,默认为未关注
          cancelFollowUrl : "/conversation/deleteConversationFollow",//取消用户关注贴吧
          addFollowUrl :  "/conversation/addConversationFollow",//新增用户关注贴吧
          selectFollowUrl :  "/conversation/selectConversationFollow" //查询用户对该贴的收藏状态
      }
    },
    props : ["datas"],
    mounted(){
          this.init();
    },
    methods : {
      init(){//初始化方法
        //判断用户是否登录，如果登录查询用户关注贴吧的状态
        if(this.getUser() != null){
            this.selectFollow(this.getUser().id);
        }else{
            return false;//没有登录，默认为未关注
        }
      },
      selectFollow(userId){//查询用户关注当前贴吧的状态
          this.common.ajax({
              url : this.selectFollowUrl,
              data : {
                  userId : userId,//用户id
                  conversationId : this.$route.query.conversationId//贴吧id,同步加载导致无法及时的获取datas中的id，所以只能通过参数来获取
              },
              success : (result)=>{
                  if(result.success){
                      //查询之后
                      if(result.result != null && result.result.length > 0){
                        this.follow = true;//用户关注了该贴吧
                      }
                  }else{
                      this.$alert(result.message,"提示")
                  }
              }
          })
      },
      cancelFollow(){//取消关注
        this.$confirm('是否取消关注？')
        .then(_ => {
          //发送请求修改用户关注该贴状态

          this.common.ajax({
            url : this.cancelFollowUrl,
            data : {
                conversationId : this.$route.query.conversationId,
                token : this.getToken(),
                userId : this.getUser().id
            },
            success : (result)=>{
                if(result.success){
                    //this.$alert('取消关注成功','提示');
                    this.follow = false;//取消关注
                }else{
                    this.$alert(result.message,"提示");
                }
            }
          })
          //done();
        })
        .catch(_ => {

        });
      },
      addFollow(){//添加贴吧的关注
      if(!this.isLogin()){//判断用户是否登录
          return;//没有登录
      }
        this.common.ajax({
          url : this.addFollowUrl,
          data : {
              userId : this.getUser().id,
              conversationId : this.datas.id,
              token : this.getToken()
          },
          success : (result)=>{
              if(result.success){
                  //this.$alert('关注成功','提示');
                  this.follow = true;//关注
              }else{
                  this.$alert(result.message,"提示");
              }
          }
        })
      },
      getSystemConfig(key){
         return this.common.systemConfig.getValue(key);
      }
    }
}
</script>
<style>
.img{
  height:100%
}
</style>
