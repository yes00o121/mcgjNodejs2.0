//帖子的标题组件
<template>
<div class="conversation-title">
    <div class="conversation-child-child-width">
      {{datas.title}}
    </div>
    <!-- 楼主菜单 -->
    <div v-if="isFollr" class="conversation-child-title-float-right">
      <el-button size="mini">删贴</el-button>
    </div>
    <!-- 不是楼主的功能菜单 -->
    <div v-else="isFollr" class="conversation-child-title-float-right">
      <el-button size="mini" class="conversation-child-title-float-right" @click="toWangEditor">回复</a></el-button>
      <el-button size="mini"  v-if="state" class="conversation-child-collection conversation-child-title-float-right" @click.stop="cancelCollection">已收藏</el-button>
      <el-button size="mini"  v-else="state" class="conversation-child-notCollection conversation-child-title-float-right" @click.stop="collection">收藏</el-button>
      <el-button size="mini" v-if="lookFollr"  class="conversation-child-title-float-right" @click="singleFloor">取消只看楼主</el-button>
      <el-button size="mini" v-else="lookFollr" class="conversation-child-title-float-right" @click="singleFloor">只看楼主</el-button>
    </div>
</div>
</template>
<script>
import baseConfig from '../../../../../config/baseConfig'
export default {
   data(){
      return {
          url : baseConfig.localhost+'/conversationChild/addConversationChildCollection',//新增收藏
          cancelCollectionUrl : baseConfig.localhost+'/conversationChild/deleteConversationChildCollection',//取消收藏
          state : false,//是否收藏该帖，默认为false
          isFollr : false,//默认不是楼主
          lookFollr : false,//默认不是只看楼主
          selectUrl : baseConfig.localhost+'/conversationChild/selectConversationChildCollection'//查询收藏的数据
      }
   },
   props : ["datas"],
   mounted(){
      if(localStorage.user == null){//用户没有登录不判断是否收藏等状态
          return;
      }
      setTimeout(()=>{
        $(()=>{//页面执行完后执行
          //判断用户是否为楼主，如果为楼主隐藏收藏，看楼主，回复功能，显示楼主的功能
          if(this.getUser().id == this.datas.userId){
              this.isFollr = true;
          }else{
              //不是楼主，判断用户是否收藏该贴
              this.initCollection();
          }
        })
      })
   },
   updated(){

   },
   methods : {
      singleFloor(){//只看楼主方法
          this.$emit('singleFloor',(this.lookFollr = !this.lookFollr));
      },
      toWangEditor(){//定位到回复
         document.getElementById('wangEditor').scrollIntoView();
      },
      initCollection(){//初始化用户该贴的收藏状态
          $.ajax({
              url : this.selectUrl,
              data : {
                token : this.getToken(),
                userId : this.getUser().id,
                conversationChildId : this.datas.id
              },
              success : (result)=>{
                  if(result.success){
                      if(result.result != null){
                          this.state = true;
                      }
                  }else{
                      throw "查询收藏失败"
                  }
              },
              error : ()=>{
                  throw "查询收藏失败"
              }
          })
      },
      isMaster(){//是否为发帖人
          //this.getUser();
      },
      collection(){//帖子收藏方法
          //判断用户是否登录
          if(!this.isLogin()){//判断用户是否登录
              return;//没有登录
          }
          var user = this.getUser();//获取当前用户数据
          var conversationChildId = this.datas.id;
          $.ajax({
              url : this.url,
              data : {
                  userId : user.id,
                  conversationChildId,
                  token : user.token
              },
              success : (result)=>{
                    if(result.success){
                        this.state = true;
                        this.$alert(result.message,'提示');
                    }else{
                      if(result.state == 2){
                        this.$alert(result.message,'提示',{
                          callback:action=>{
                            this.reset();//清空并且刷新页面
                          }
                        });
                      }
                    }
              },
              error : ()=>{
                  throw "收藏失败"
              }
          })
      },
      cancelCollection(){//取消收藏的方法
          this.$confirm('是否取消收藏？')
          .then(_ => {
            this.state = false;
            $.ajax({
                url : this.cancelCollectionUrl,
                type : 'post',
                data : {
                    token : this.getToken(),
                    userId : this.getUser().id,
                    conversationChildId : this.datas.id
                },
                success : (result)=>{
                    if(result.success){
                        this.state = false;
                        this.$alert(result.message,'提示');
                    }else{
                        throw "取消收藏失败"
                    }
                },
                error : ()=>{
                    throw "取消收藏失败"
                }
            })
            //done();
          })
          .catch(_ => {

          });
      }
   }
}
</script>
<style>
.conversation-child-collection{
  background-color: #dcdfe6;
}
.conversation-child-notCollection{

}
.conversation-child-title-float-right{
  float:right;
  margin-left:10px;
}
.conversation-child-child-width{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 65%;
    display: inline-block;
}
</style>
