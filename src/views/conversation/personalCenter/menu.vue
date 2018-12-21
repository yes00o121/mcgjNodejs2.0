<template>
  <div style="display: flex;" >
    <div style="width:100%" >
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="主页" name="home" >
            <personalHome></personalHome>
        </el-tab-pane>
        <el-tab-pane label="回复我的" name="message">
          <personalMessage></personalMessage>
        </el-tab-pane>
        <el-tab-pane label="我的贴子" name="post">
          <personalPost @publish = "publish" ></personalPost>
        </el-tab-pane>
        <el-tab-pane label="收藏"  name="collection">
          <personalCollection></personalCollection>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="padding: 15px 0 30px 15px;">
      <div>

      </div>
    </div>
  </div>
</template>
<script>
import personalHome from './home'//菜单主页组件
import personalMessage from './message'//菜单消息组件
import personalPost from './post'//菜单贴子组件
import personalCollection from './collection'//菜单收藏组件
export default {
    data(){
      return {
          activeName : 'home'
      }
    },
    components : {personalHome,personalMessage,personalPost,personalCollection},
    mounted(){
        //获取top组件然后取到activeName,跨越多个组件获取top组件
        this.activeName = this.$parent.$parent.$parent.$children[0].activeName;
    },
    methods : {
      handleClick(){

      },
      publish(value){
          this.$emit('publish',value)
      }
    }
}
</script>
<style>

</style>
