//消息组建
<template>
  <div class="message-core">
      <div v-if="datas.length > 0"div style="padding:10px;">
          <div></div>
          <div v-for="(data,index) in datas" style="padding:10px;border-bottom:1px solid #DCDCDC;">
              <div style="display: flex;position: relative;font-size:14px;color:#2d64b3">
                  <div>{{data.userName}}&nbsp;:</div>
                  <div class="message-content" style="color:#2d64b3">
                  <router-link v-bind:id="'message_id_'+data.id" style="color:#2d64b3;text-decoration:none;" :to="{path:'/conversationChildChild',query : {id:data.conversationChildId,start:1}}" target="_blank">
                    {{handlerMessage(data.id,data.content)}}
                  </router-link>
                  </div>
                  <div style="position: absolute;right:0;margin-right:20px;font-size:12px;">{{handlerDate(data.createDate)}}</div>
              </div>
              <div style="display: flex;position: relative;color:#989898;font-size:12px;">
                  回复我的主题: <div class="message-content"><a href="#" style="color:#000;text-decoration:none;">{{data.title}}</a></div>
                  >&nbsp;&nbsp;
                  <a href="#" style="color:#000;text-decoration:none;">{{data.conversationName}}</a>
              </div>
          </div>
      </div>
      <div v-else="datas.length == 0" class = "not_message">
          没有新的回复
      </div>
      <page ref = "page" @getPage = "getPage"></page>
  </div>
</template>
<script>
import page from '../../components/page'//引入分页工具
export default {
    data(){
        return {
           url : '/conversationChildChild/selectConversationChildChildReplyByUserId',//查询该用户没有处理的回复数据
           datas : [],
           start : 1,//开始页数
           limit : 10,//单页数量
        }
    },
    mounted(){
      //成功引入分页初始化页数,否则不处理
      this.initPage();//设置当前分页显示的页数
      //获取当前用户未查看的回复消息数据
      this.selectReplys();
      //this.scroll();//监听浏览器,暂时不加
    },
    components:{page},//组件
    updated(){

    },
    watch:{
      start(){//用户切换页数
        //刷新页面数据
        this.selectReplys();
      }
    },
    methods : {
        initPage(){//初始化页数
          this.$refs.page.size = this.limit;//单页显示
        },
        scroll(){//浏览器变化监听
            document.body.onscroll = function(){
                console.log(document.body.scrollTop)
            }
        },
        handlerMessage(id,content){
            setTimeout(()=>{
              this.appendContent(id,content);
            })

        },
        getPage(val){//获取分页数据
            //修改开始页的索引
            this.start = val;
        },
        selectReplys(){
            this.common.ajax({
              url : this.url,
              data:{
                token : this.getToken(),
                userId : this.getUser().id,
                start : this.start,
                limit : this.limit
              },
              success : (result)=>{
                  if(result.success){
                      this.datas = result.result.conversationChildChilds;
                      this.$refs.page.total = result.result.total;//总数
                  }else{

                  }
              }
            })
        },
        appendContent(id,str){//获取标签的汉字和数字
          if(str != null){
            var value = str.replace(/<.*?>/ig,"").replace("&nbsp;","").trim();
            document.getElementById('message_id_'+id).innerHTML=value;
          }
          //var value = str.replace(/<.*?>/ig,"")
          //
        }
    }
}
</script>
<style>
.message-core{

}
.message-content{
  color : #000;
  margin-bottom:10px;
  width : auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.not_message{
  text-align: center;
  padding-bottom: 18px;
}
</style>
