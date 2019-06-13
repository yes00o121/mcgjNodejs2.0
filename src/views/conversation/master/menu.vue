//吧务管理菜单页面
<template>
  <el-row class="tac" >
  <el-col :span="12">
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo left-menu"
    @open="handleOpen"
    @close="handleClose" >

    <el-menu-item index="1" style="margin-left:10px">
      <i class="el-icon-menu"></i>
      <span slot="title">界面管理</span>
    </el-menu-item>
    <el-menu-item index="2" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">贴子管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">吧员管理</span>
    </el-menu-item>
  </el-menu>
  </el-col>
  </el-row>
</template>
<script>
import userManage from './panel/userManage'//吧员管理组件
export default{
  data(){
      return {

      }
  },
  component : {userManage},
  methods : {
    handleOpen(key, keyPath) {
      console.log('点击了啊。。。')
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toCenter(val){
      //切换页面时候判断，如果当前页面的参数为null跳转至错误页面
/*
      if(this.$route.query.conversationId == null){
          this.$route.push({
            path : '/error'
          })
      }
*/
      //暂时不考虑用户修改参数问题
      this.$router.push({
        path : val+"?conversationId="+this.$route.query.conversationId
      })
    }
  }
}
</script>
<style>
    .left-menu{
        display: table-caption;
        /*border : 1px solid rgb(220, 223, 230);*/
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

    }
</style>
