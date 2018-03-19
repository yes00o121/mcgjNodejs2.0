//发表回复功能组件,设置发表或回复组件的状态显示不同的组件
<template>
  <div>
    <div class="reply-core" v-if="replayShow">
        <!-- 回复组件 -->
        <div v-if="true">
        <div class="reply-top">发表回复</div>
        <div>
          <!-- 文本域 -->
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 12}"  placeholder="请输入内容" v-model="content" resize="none"></el-input>
        </div>
        <div class="reply-bottom">
            <el-button size="mini" type="primary" @click="publish">发表</el-button>
        </div>
        </div>
    </div>
    <!-- 发表组件 -->
    <div class="reply-core2" v-if="publishShow">
      <div class="reply-top" >发表新贴</div>
        <el-input v-model="title" size="small" placeholder="请填写标题" class="reply-title">请输入标题</el-input>
      <div>
        <!-- 文本域 -->
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 12}"  placeholder="请输入内容" v-model="content" resize="none"></el-input>
      </div>
      <div class="reply-bottom">
          <el-button size="mini" type="primary" @click="publish">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
          content : '',
          title : '',//标题
          replayShow : false,//回复组件
          publishShow : false//发表组件
        }
    },
    methods : {
      publish(){//发布方法
          this.$emit('onPublish',this.content,this.title)
      }
    }
}

</script>
<style>
.reply-core{
    width : 70%;
    /*border : 1px solid red;*/
    height : 300px;
    text-align:center;
    margin:0 auto;
    margin-top:40px;
    margin-bottom:40px;
}
.reply-core2{
    width : 70%;
    height : 350px;
    text-align:center;
    margin:0 auto;
    margin-top:20px;
    margin-bottom:40px;
}
.reply-top{
  margin:10px 10px 0px 0px;
  float:left;
  font-size:14px;
}
.reply-bottom{
    margin:10px 10px 10px 0px;
    float:left;
}
.reply-title{
  padding-top : 10px;
  padding-bottom : 20px;
}
</style>
