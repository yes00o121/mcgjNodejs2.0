//贴子组建
<template>
<div class="post-core">
  <div v-if="isPost">
      <el-table
      :data="datas"
      >
      <el-table-column
        prop="title"
        label="标题"
        >
        <template slot-scope="scope">
            <router-link style="color:#2d64b3;text-decoration:none;" :to="{path:'/conversationChildChild',query : {id:scope.row.id,start:1}}" target="_blank">
              {{scope.row.title}}
            </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="发布时间"
        >
      </el-table-column>
      <el-table-column
        prop="replyNumber"
        label="回复">
      </el-table-column>
      <el-table-column
        prop="flow"
        label="点击">
      </el-table-column>
    </el-table>
    <page ref = "page" @getPage = "getPage"></page>
  </div>
  <div v-else="isPost">
    没有创建的帖子数据
  </div>
</div>
</template>
<script>
import page from '../../components/page'//分页组件
export default {
    data(){
        return {
            isPost : true,//默认用户没有创建过贴子
            datas : [],
            url :  '/conversationChild/selectUserPublishConversationChild',
            start : 1,//默认开始页
            limit : 10,//单页显示数量
        }
    },
    mounted(){
      this.init();
    },
    components : {page},//组件
    methods:{
        init(){//初始化方法
            console.log('收藏...')
            console.log(this.$refs)
            //设置单页显示数据量
            this.$refs.page.size = this.limit;
            this.selectUserPublishConversationChild();
        },
        getPage(val){//用户切换分页时调用
            this.start = val;
            this.selectUserPublishConversationChild();
        },
        selectUserPublishConversationChild(){//查询用户所发表的所有帖子数据
            this.common.ajax({
                url : this.url,
                data : {
                    userId : this.getUser().id,
                    token : this.getToken(),
                    start : this.start,
                    limit : this.limit
                },
                success : (result)=>{
                    if(result.success){
                        //时间进行转换
                        for(let i=0;i<result.result.conversationChilds.length;i++){
                            let date = new Date(result.result.conversationChilds[i].createDate);
                            result.result.conversationChilds[i].createDate = date.getYear()+1900 +"-"+(date.getMonth()+1) + "-" + date.getDate()
                            //result.result.conversationChilds[i].createDate = this.handlerDate(result.result.conversationChilds[i].createDate)
                        }
                        this.datas = result.result.conversationChilds;//数据赋值
                        //设置总页数
                        this.$refs.page.total = result.result.total;
                        //设置发贴数量
                        this.setPublishNumber();
                    }else{
                        this.$alert(result.message,'提示')
                    }
                },
                error : ()=>{
                  throw "查询失败"
                }
            })
        },
        setPublishNumber(){//设置发贴的数量
            this.$emit('publish',this.datas.length)
        }
    }
}
</script>
<style>
.post-core{

}
</style>
