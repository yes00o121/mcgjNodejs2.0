<!-- 中间放置动态数据 -->
<template>
  <div class= "body-center-width">
      <div style="width:100%">
        <el-tabs id="homeBodyCenter" type="border-card">
          <el-tab-pane label="最新动态">
            <ul style="display:grid">
              <li v-for="data in datas" style="padding-bottom:24px;">
                  <div>
                    <div>
                      <div style="margin-bottom:5px;">
                        <router-link style="text-decoration:none;"  target="_blank" title="data.conversationName" :to="{path:'/conversationChild',query : {conversationId:data.childId,start:1}}">
                            {{data.conversationName}}吧
                        </router-link>
                      </div>
                    </div>
                    <div style="margin-bottom:5px;">
                      <router-link  style="text-decoration:none;color:#2d64b3"  target="_blank" title="data.title" :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}">
                          {{data.title}}
                      </router-link>
                      <span style="margin-left:10px;font-size:12px;">
                        <el-button size="mini" style="height:25px">{{data.replyNumber}}</el-button>
                      </span>
                    </div>
                    <div v-html="conversationChildFilter(data.content)">

                    </div>
                    <div style="padding-top: 2px;font-size:12px;color:#999">
                        <img v-bind:src="imgUrl+data.photo" style="height: 15px;border-radius: 50%;">
                        <a href="#" style="color:#999;margin-left:5px;">{{data.userName}}</a>
                        <span style="padding-left:21px;">{{handlerDate(data.lastTime)}}</span>
                    </div>
                  </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        activeName: 'newest',
        newestUrl : '/conversation/selectNewestConversation',//最新数据
        imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',//图片url
        datas:[]//最新动态数据源
    };
  },
  mounted : function(){
      this.findNewestConversation();//初始化时获取最新帖子动态数据源
  },
  updated(){

  },
  methods : {
      findNewestConversation : function(){//获取最新的动态数据源
          this.common.ajax({
              url : this.newestUrl,
              type : 'post',
              async : false,//需要同步执行
              success : (result)=>{
                  this.datas = result.result;
                  console.log(this.datas)
              }
          })
      },
      jump(){
          this.$router.push({
              path : '/conversationChildChild'
          })
      }
  }
}
</script>
<style>
.body-center-width {
  border : 1px soild #DCDCDC;
  width:60%;
  float : left;
  margin-left : 14px;
  font-family : Microsoft YaHei;
}
.body-cneter-alignment-ul{
  text-align:left;
  margin:20px 20px 20px 20px;
}
.body-cneter-alignment-li{
  text-align:left;
  margin-top:5px;
  width: 245px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.body-cneter-tag{
  margin-left:10px;
}
.body-cneter-content{
  margin-bottom:10px;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size:14px;
}
.body-cneter-spacing{
  margin-left:10px;
}
.body-cneter-font-size{
  font-size:14px;
}

</style>
