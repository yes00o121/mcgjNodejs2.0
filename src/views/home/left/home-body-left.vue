<!-- 左侧放置分类数据 -->
<template>
  <div class= "body-left-width">
    <div style="border:1px solid #dcdfe6;padding:9px 10px 5px 9px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);">
        <div v-for="data in datas" style="border-bottom: 1px solid #ccc;font-size:14px;">
          <div style="padding-top:3px;padding-bottom:3px;">
            <span style="color:#999;" class="el-icon-star-off"></span>
            <a  style="color:#999;padding:4px 4px 2px 2px;inline-block;">{{data[0].dictName}}</a>
          </div>
          <div style="display: flex;">
            <div style="width: 190px;overflow: hidden;">
                <router-link v-for="d in data" class="home-body-conversationName"  target="_blank" title="d.conversationName" :to="{path:'/conversationChild',query : {conversationId:d.id,start:1}}">
                  {{d.conversationName}}
                </router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        url : this.baseConfig.localhost + '/conversation/selectConversationTypeAndData',//获取贴吧数据
        datas : {}
    };
  },
  mounted(){
      this.init();
  },
  methods : {
      init(){
            this.selectConversationTypeAndData();
      },
      selectConversationTypeAndData(){
          $.ajax({
              url : this.url,
              success : (result)=>{
                    if(result.success){
                        this.datas = result.result;
                    }
              },
              error :()=>{
                  throw "查询失败"
              }
          })
      },
      handlerType(datas){//处理贴吧类型数据

      }
  }
}
</script>
<style>
.body-left-width {
  height : 70%;
  width : 15%;
  /*border : 1px solid #DCDCDC;*/
  display:inline;
  float : left;
}
.home-body-conversationName{
  padding: 4px 4px 2px 2px;
  padding-right: 10px;
  color:#999;
  display: inline-block;
  font-size:12px;
}
</style>
