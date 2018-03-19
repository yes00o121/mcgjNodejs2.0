//分页组件
<template>
  <div>
    <div class="page-core">
        <div class="page-style">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-size="size"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
        currentPage2 : this.currentPage,//当前页数
        total : 0,//数据总条数
        size : 20//一页显示的条数
      }
    },
    props : ['currentPage'],//接收的父组件当前页数
    mounted:function(){//记录当前用户最后显示的页数

    },
    methods : {
      handleSizeChange(val){

      },
      handleCurrentChange(val){
        this.$emit('getPage',val);//传递页数给父类
      }
    }
}
</script>
<style>
.page-style{
  margin-top:20px;
  margin-bottom : 20px;
}
.page-core{
  border-bottom:1px solid #DCDCDC;
}
</style>
