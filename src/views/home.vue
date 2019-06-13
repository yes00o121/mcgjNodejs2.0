<template>
  <div class="home-core" id= "homeCore">
  <el-container>
  <topHome></topHome>
  <!--<utilHome></utilHome>-->
  <div  id= "main">
    <el-main style="padding:0px;width:1040px;margin:0 auto;padding-top:8px;padding-top: 33px;">
        <router-view></router-view>
    </el-main>
  </div>
  <el-footer style="display:none">
    <bottomHome></bottomHome>
  </el-footer>
</el-container>
  </div>
</template>

<script>
import aa from './conversation/addConversation'//添加贴吧组件
import topHome from './home/home-top'//头部面板
import menuHome from './home/home-menu'//菜单面板,暂不使用
import bodyHome from './home/home-body'//核心面板
import bottomHome from './home/home-bottom'//底部面板
import utilHome from './home/home-util'//工具栏
import homeBody from './home/home-body'
export default {
  data(){
    return {}
  },
  components : {topHome,menuHome,bottomHome,bodyHome,utilHome,homeBody},
  mounted(){

  },
  methods : {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-core{
  margin-left:-8px;
  margin-right:-8px;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  /**
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  */

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .demo-box.demo-menu .el-menu-demo {
    padding-left: 55px;
}
.box {
display: inline-block;
}
a:hover{text-decoration:underline;color: #red;}
</style>
