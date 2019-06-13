<!-- 菜单尚未使用-->
<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">分类</el-menu-item>
    <el-menu-item index="3"><a href="#">生活</a></el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
     activeIndex2: '1'
    }
}
}
</script>
<style>

</style>
