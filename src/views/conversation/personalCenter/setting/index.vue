//用户个人信息编辑
<template>
  <div class="master-core-layout">
      <settingMenu :datas="datas"></settingMenu>
  </div>
</template>
<script>
import settingMenu from '../../../components/leftMenu'//引入菜单组件
export default{
  data(){
      return {
          datas : [{path : '/personalCenter/setting/photo',name : '头像设置'}],//定义菜单
      }
  },
  mounted(){

  },
  updated(){

  },
  methods: {

   },
   components : {settingMenu}
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
