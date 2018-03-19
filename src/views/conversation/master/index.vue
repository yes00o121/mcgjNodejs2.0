//吧务管理页面，吧主有操作的权限
<template>
  <div class="master-core-layout">
    <masterMenu></masterMenu>
    <router-view class = "master-center-core" :datas= "datas">
    </router-view>
  </div>
</template>
<script>
import masterMenu from './menu'//引入菜单组件
export default{
  data(){
      return {
          url : this.baseConfig.localhost+'/conversation/selectConversationById',//查询当前帖子的标题头像等内容
          datas : JSON.parse(localStorage.currentConversation)//对应的贴吧数据
      }
  },
  mounted(){
    this.init();

    console.log($('.master-center-core')[0])
    $('.master-center-core')[0].style.height=window.outerHeight-300+"px"//初始化中心高度
  },
  updated(){
      if($('.master-center-core')[0] != null)
        $('.master-center-core')[0].style.height=window.outerHeight-300+"px"//初始化中心高度
  },
  methods: {
      init(){
          //如果当前参数被用户删除，直接跳转至错误页面
          if(this.$route.query.conversationId == null){
              this.$router.push({
                  name : 'error'
              })
          }
          this.getConversationData();
      },
      getConversationData(){//获取当前贴吧数据
          /*
          $.ajax({
              url : this.url,
              async : false,
              data : {
                  token : this.getToken(),
                  id : this.$route.query.conversationId
              },
              success : (result)=>{
                  if(result.success){
                      this.datas = result.result;
                  }else{
                      this.$alert(result.message,'提示');
                  }
              },
              error : ()=>{
                  throw "查询错误"
              }
          })
          */
      }
   },
   components : {masterMenu}
}
</script>
<style>
.master-menu-style{
  display: -webkit-box;
  margin-left:0px;
  width: 100%;
}
.master-core-layout{
  display: inline-flex;
  width:100%
}
.master-center-core{
  margin-left: 50px;
  border:1px solid #e1e1e1;
  width:85%;
  background-color : white;
}
</style>
