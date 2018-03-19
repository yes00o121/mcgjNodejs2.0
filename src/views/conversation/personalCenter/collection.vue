//收藏组建
<template>
  <div class="collection-core">
    <div v-if="isCollection">
        <el-table
        :data="datas"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="500">
          <template slot-scope="scope">
              <router-link style="color:#2d64b3;text-decoration:none;" :to="{path:'/conversationChildChild',query : {id:scope.row.conversationChildId,start:1}}" target="_blank">
                {{scope.row.title}}
              </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="最后更新时间">
        </el-table-column>
      </el-table>
    </div>
    <div v-else="isCollection">
      没有收藏的帖子数据
    </div>
  </div>
</template>
<script>
import baseConfig from '../../../../config/baseConfig'
export default {
    data(){
        return {
          url : baseConfig.localhost+'/user/selectCollectionConversationChildByUserId',
          datas: [],
          isCollection : false//是否有收藏贴子，默认为false
        }
    },
    mounted(){//初始化数据
        this.init();
    },
    methods : {
        init(){//初始化数据
           this.getData();
        },
        getData(){
            $.ajax({
                url : this.url,
                type : 'post',
                data : {
                    token : this.getToken(),
                    userId : this.getUser().id
                },
                success : (result)=>{
                    if(result.success){
                        if(result.result != null){
                          //转换时间
                          for(var i=0;i<result.result.length;i++){
                              result.result[i].createDate = this.handlerDate(result.result[i].createDate)
                          }
                          this.datas = result.result;
                          this.isCollection = true;//用户有收藏的贴子，进行展示
                        }
                    }else{

                    }
                },
                error : ()=>{
                    throw "获取收藏数据失败"
                }
            })
        }
    }
}
</script>
<style>
.collection-core{
  padding:10px;
}
.collection-title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 10%;
}
</style>
