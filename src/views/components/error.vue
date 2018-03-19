//错误页面，用户查询的帖子贴子或者贴吧不存在
<template>
  <div >
    <div style="position: relative;">
      <img class="error-image" src="../../../static/img/404.jpg">
      <h1 class="error-content">页面不存在或者已被删除</h1>
      <el-button class="error-button"  @click="toHome">返回首页</el-button>
    </div>

  </div>
</template>
<script>
export default{
    data(){
        return {

        }
    },
    methods : {
        toHome(){
            this.$router.push({
              path : '/'
            })
        }
    }
}
</script>
<style>
.error-image{
  width : 100%;
  height : 100%;
}
.error-content{
  position: absolute;
  top: 0;
  margin-left: 40%;
  margin-top: 9%;
}
.error-button{
  position: absolute;
  top: 0;
  margin-left: 46%;
  margin-top: 13%;
}
</style>
