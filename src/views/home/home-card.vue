//卡片组件
<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in limit" :key="item">
        <router-link v-if="datas[item-1]!=null"  :to="{path:'/conversationChild',query : {conversationId:datas[item-1].id,start:1}}">
          <img v-if="datas[item-1]!=null" v-bind:src= "imgUrl+datas[item-1].cardBanner" style="height:100%;width:100%">
        </router-link>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export  default{
    data(){
        return {
            url : '/conversation/selectMaxFollow',
            imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',
            datas : {},
            limit : 6//默认要显示的卡片数量
        }
    },
    mounted(){
      this.init();
    },
    methods:{
        goto(value){//跳转至对应贴吧
            this.$router.push({
                path : '/conversation'
            })
            console.log('点击之后。。')
            console.log(value)
        },
        init(){
            this.selectMaxFollow();
        },
        selectMaxFollow(){//获取卡片所要显示的数据,按关注量查询指定的贴吧数据
            this.common.ajax({
                url : this.url,
                data : {
                  limit : this.limit
                },
                success : (result)=>{
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

</style>
