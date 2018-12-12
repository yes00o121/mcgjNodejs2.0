<!-- 右侧放置排行数据 -->
<template>
  <div class= "body-right-width" >
    <div class="body-right-layout">
        <div id="bodyHomeRightLabel">
          <!--<span style="position: absolute;right:30%;padding-top:6px;font-size:18px;">热门贴子</span>-->
          <el-tabs style="font-size:12px;" v-model="activeName" @tab-click="handleClick" tab-position="top">
            <el-tab-pane  label="日榜" name="yesterday">
                <div>
                  <ul style="display: grid;">
                      <li v-for="data,index in datas" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 5px 0;">
                        <span  class="body-right-label-index" v-if="index<3" style="background:#f25d8e">{{index+1}}</span>
                        <span  class="body-right-label-index" v-if="index>2">{{index+1}}</span>
                        <router-link style="text-decoration:none;"  target="_blank" title="data.title" :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}">
                            <span >{{data.title}}</span>
                        </router-link>
                      </li>
                  </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane  label="周榜" name="month">
              <div>
                <ul style="display: grid;">
                    <li v-for="data,index in datas" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 5px 0;">
                      <span  class="body-right-label-index" v-if="index<3" style="background:#f25d8e">{{index+1}}</span>
                      <span  class="body-right-label-index" v-if="index>2">{{index+1}}</span>
                      <router-link style="text-decoration:none;"  target="_blank" title="data.title" :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}">
                        <span>{{data.title}}</span>
                      </router-link>
                    </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        activeName : 'yesterday',//默认展示标签
        url : '/conversationChild/selectMaxConversationChildByDay',
        day : 1,//默认为一天
        datas : {}
    };
  },
  mounted(){
      $('#bodyHomeRightLabel div div div div')[0].style.paddingLeft="120px";
      this.selectMaxConversationChildByDay();
  },
  methods : {
      handleClick(value){
          if(this.activeName == 'yesterday'){
              this.day = 1;
          }
          if(this.activeName == 'month'){
              this.day = 7;
          }
          this.selectMaxConversationChildByDay();//刷新数据
      },
      selectMaxConversationChildByDay(){
          this.common.ajax({
              url : this.url,
              data:{
                  day : this.day
              },
              success :(result)=>{
                    if(result.success){
                        this.datas = result.result;
                    }
              }
          })
      }
  }
}
</script>
<style>
.body-right-width {
  height : 70%;
  width : 22%;
  border : 1px solid #DCDCDC;
  display:inline;
  margin-left: 14px;
  float: left;
}
.body-right-layout{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

}
.body-right-label-index{
  height: 18px;
  width: 18px;
  line-height: 18px;
  background: #ccd0d7;
  border-radius: 4px;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-right: 6px;
  padding: 1px 4px;
}
.el-tabs__header{
padding: 0;
position: relative;
margin: 0 0 0px;
}
</style>
