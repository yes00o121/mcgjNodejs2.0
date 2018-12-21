//个人中心主页面
<template>
  <div class="personal-core">
  <div class="personal-header">

    <img v-if="user.photo != null && user.photo != ''" v-bind:src="imgUrl+user.photo" class="personal-photo">
    <img v-else="user.photo == null || user.photo == ''" v-bind:src="getSystemConfig('master.photo')" class="personal-photo">
    <!-- 卡片背景  -->
    <div class="personal-header-top " style="background-size: contain;"></div>
    <div class="personal-header-center">
    <el-button  style="margin-left:25%;color:blue" size="mini" class="el-icon-edit">编辑资料</el-button>
    </div>
    <div class="personal-header-bottom">
        <div style="padding-top: 10px;">
          <router-link :to="{path : '/conversationChild'}" style="text-decoration: none;margin-left: 24%;font-size: 22px;color:black">
            {{user.userName}}
          </router-link>
          <div style="margin-left:24%;font-size:12px;color:#797C80;margin-top:5px;">
              <div>发帖&nbsp;:&nbsp;{{publishNumber}}</div>
          </div>
        </div>
    </div>
    <div class="personal-child-header-bottom">

    </div>
  </div>
  <div>
        <personalMenu @publish = "publish" ></personalMenu>
  </div>
  <div class="personal-center">

  </div>
  </div>
</template>
<script>
import baseConfig from '../../../../config/baseConfig'//配置
import personalMenu from './menu'//菜单组建
export default {
  data(){
    return {
        imgUrl : baseConfig.localhost+baseConfig.imgUrl+'?imgId=',//图片url
        user : this.getUser(),
        publishNumber : 0//发贴数量
    }
  },
  mounted:function(){
  console.log(this.common.systemConfig.getValue('master.photo'))
  //var a = this.common.systemConfig.getValue('master.photo')
      this.init();
  },
  components : {personalMenu},
  methods : {
    init(){
        //window.bb = this.$refs;
        var value = this.getSystemConfig('master.card_banner');
        $('.personal-header-top').css('background-image',"url("+value+")")
    },
    publish(value){
        this.publishNumber = value;
    },
    getSystemConfig(key){
       return this.common.systemConfig.getValue(key);
    }
  }

}
</script>
<style>
.personal-top{
  background-image:url('/static/img/master_card.jsp');
  background-color : black;
  width : 100%;
  height : 50%;
  position:relative;
}

.personal-center{
    height : 100%;
}
.personal-photo{
  top : 130px;
  left : 20px;
  width : 150px;
  height : 150px;
  float : left;
  position:absolute;
}
.personal-core{
  padding:0px;
  width:800px;
  margin:0 auto;
  margin-top : 10px;
  border : 1px solid #DCDCDC;
}
.personal-header{
    border-bottom: 1px solid #DCDCDC;
    height:300px;
    position:relative;
}
.personal-header-top{
  height:55%;
  background-color:black
}
.personal-header-center{
  height:10%;
  background-color:#D0E9FF
}
.personal-header-bottom{
  height:35%;
  background-color:#f9fafd
}
.personal-child-header-bottom{
  position:absolute;
  bottom:20px;
  left:20px;
}
.personal-photo{
width : 150px;
height:150px;
padding: 4px;
background : white;
border: 1px solid #DCDCDC;
}
</style>
