//左侧菜单组建
<template>
    <el-row class="tac" >
    <el-col >
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="white"
        text-color="#fff"
        active-text-color="black"
        >
        <el-menu-item v-for="data in datas" class="master-menu-style" index="1" @click="push(data.path)" >
          <i class="el-icon-menu"></i>
          <span slot="title" >{{data.name}}</span>
        </el-menu-item>
        <el-menu-item index="2" class="master-menu-style" @click="push('/master/conversationManage')" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">贴子管理</span>
        </el-menu-item>
        <el-menu-item class="master-menu-style" @click="push('/master/userManage')" index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">吧员管理</span>
        </el-menu-item>
        <el-menu-item class="master-menu-style" index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">待定</span>
        </el-menu-item>
        <el-menu-item class="master-menu-style" index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">待定</span>
        </el-menu-item>
        <el-menu-item class="master-menu-style" index="6">
          <i class="el-icon-setting"></i>
          <span slot="title">待定</span>
        </el-menu-item>
        <el-menu-item class="master-menu-style" index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">待定</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
//import userManage from './panel/userManage'//吧员管理组件
export default{
  data(){
      return {
          datas : []
      }
  },
  props : ['datas'],//接收的父组件的参数
  //component : {userManage},
  methods : {
    handleOpen(key, keyPath) {
      console.log('点击了啊。。。')
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    push(val){
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
.menu-item{
  background-color:white
}
</style>
