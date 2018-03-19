//卡片组件
<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <img src= "http://127.0.0.1:8090/common/image?imgId=5a9669d6a1612b5e2f09adb4" style="height:100%;width:100%" @click="goto">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export  default{
    data(){
        return {

        }
    },
    methods:{
        goto(){
            console.log('点击之后。。')
        }
    }
}
</script>
<style>

</style>
