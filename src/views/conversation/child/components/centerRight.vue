//中心楼层页面右侧
<template>
  <div id= "centerRight">
    <div>
    <div class = "center-right-userInfo" v-if="user != null">
        <h4>我在贴吧</h4>
        <div>
            <div style="display: inline-flex;">
              <div class="center-right-photo-margin">
                <img class="center-right-photo" v-bind:src="imgUrl+user.photo">
              </div>
              <div class="center-right-photo-right">
                  <div style="margin-top: 5px;">
                      {{user.userName}}
                  </div>
                  <!-- 判断当前用户是否是该贴吧的吧主，如果是显示吧务管理按钮 -->
                  <div>
                      <el-button v-if="master" style="margin-top:10px;" size="mini" @click="toMaster">吧务管理</el-button>
                  </div>
              </div>
            </div>
            <div style="font-size: 12px;">
              <div style="color:#ccc;margin-top:5px;margin-bottom:5px;">我的本吧信息</div>
              <div style="font-size:12px;">排名 ：2333</div>
              <div style="display: inline-flex;margin-top: 10px;">
                  <div>
                    经验&nbsp;:&nbsp;&nbsp;
                  </div>
                  <div>
                  <el-progress style="width:160px;" :text-inside="true" :stroke-width="14" :percentage="50" status="success"></el-progress>
                  </div>
              </div>
            </div>
        </div>
    </div>
    <div style="padding: 16px;">
      <h4 style="font-size: 14px;margin: 0px;">本吧信息</h4>
      <div class="center-right-master">
        <img v-bind:src="imgUrl+conversationData.photo" style="width:60px;height:60px;">
      </div>
      <div class="center-right-master">
          <span>吧主&nbsp;:&nbsp;{{conversationData.userName}}</span>
      </div>
      <div class="center-right-master">
        <span>类型&nbsp;:&nbsp;{{conversationData.dictName}}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import baseConfig from '../../../../../config/baseConfig'//配置
export default{
    data(){
        return {
            imgUrl : baseConfig.localhost+baseConfig.imgUrl+'?imgId=',//图片url
            user : this.getUser(),//获取当前用户信息
            master : false,//是否为吧主，默认为false
            conversationInfoUrl : this.baseConfig.localhost+'/conversation/selectConversationMaster',//查看本吧信息
            conversationData : {},//贴吧数据
            currentConversation : this.getConversation()
        }
    },
    props:["datas"],
    mounted(){
      this.init();//初始化方法
    },
    methods : {
        init(){
          /*
          let centerRight = document.getElementById('centerRight');
          let centerRightHeight = centerRight.scrollHeight+120;//获取当前标签的高度位置
          //获取当前div相对于滚动条的位置，实时监听滚动条，如果滚动条一旦超过指定位置，整个div标签进行绝对定位
          window.onscroll = ()=>{
              if(window.scrollY >centerRightHeight){
                  this.setposition(centerRight);
              }else{
                  this.resetPosition(centerRight);
              }
          }
          */
          //this.isMaster();
          this.conversationInfo();//查询贴吧信息
        },
        conversationInfo(){//查询本贴吧信息
            if(this.currentConversation == null)
              return;
            $.ajax({
                url : this.conversationInfoUrl,
                data : {
                    id : this.currentConversation.id
                },
                success : (result)=>{
                    if(result.success){
                        console.log('成功。。。')
                        this.conversationData = result.result;
                    }
                },
                error : ()=>{
                    throw "查询错误"
                }
            })
        },
        setposition(centerRight){//设置面板位置
            centerRight.style.position = 'fixed';
            centerRight.style.top = 0;
        },
        resetPosition(centerRight){//还原面板位置
          centerRight.style.position = '';
        //centerRight.style.top = 0;
        },
        isMaster(){//是否是吧主
            if(this.datas.currentManageUserId == this.getUser().id){
                this.master = true;
            }
        },
        toMaster(){//跳转到吧务管理页面
            this.$router.push({
              path : '/master',
              query : {conversationId : this.datas.id}
            })
        }
    }
}
</script>
<style>
.center-right-userInfo{
    font-size:14px;
    padding: 16px;
    border-bottom: 1px solid #ccc;
}
.center-right-photo{
  height:80px;
  width:80px;
  position: absolute;
}
.center-right-photo-margin{
  height:80px;
  width:80px;
  padding: 2px;
  border: 1px solid #ccc;
}
.center-right-photo-right{
  margin-left:20px;
}
.center-right-master{
  font-size:12px;
  margin-top:5px;
  margin-bottom:5px;
  color:#666;
}
</style>
