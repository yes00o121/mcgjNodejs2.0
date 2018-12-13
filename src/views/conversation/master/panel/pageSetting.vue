//界面设置
<template>
  <div class = "master-center-core">
    <div style = "border-bottom:1px solid #e1e1e1;height:10%">
        <h1 style="margin-left:50px;">界面设置</h1>
    </div>
    <div style="display: inline-flex;width:100%;height:85%;margin-top:5px;">
        <div class= "center-pageSetting">
            <div style="text-align: center;padding-top:20px;">头像</div>
            <!--
            <div style="width:100%;text-align: center;margin-top: 20px;">
                <!-- 用户头像 -->
                <img id="conversationPhoto" v-bind:src='imgUrl+datas.photo' style="width:150px;height:150px;">
            </div>
            -->
            <div style="width:100%;text-align: center;margin-top: 20px;">
              <upImage id="conversationPhoto" ref="upImage"></upImage>
            </div>
            <div style="width:100%;text-align:center;margin-top: 20px;">
              <el-button size="mini" @click="savePhoto">保存</el-button>
            </div>
        </div>
        <div class= "center-pageSetting" >
            <div style="text-align: center;padding-top:20px;">横幅</div>
            <div style="width:100%;text-align: center;margin-top: 20px;">
              <cardBannerImage  ref="cardBannerImage"></cardBannerImage>
            </div>
            <div style="width:100%;text-align:center;margin-top: 20px;">
              <el-button size="mini" @click="saveCardBanner">保存</el-button>
            </div>
        </div>
        <div class= "center-pageSetting" >
            <div style="text-align: center;padding-top:20px;">背景</div>
            <div style="width:100%;text-align: center;margin-top: 20px;">
              <backgroundImage  ref="backgroundImage"></backgroundImage>
            </div>
            <div style="width:100%;text-align:center;margin-top: 20px;">
              <el-button size="mini" @click="saveBackground">保存</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import upImage from '../../../components/upImage'//上传图片组件
import cardBannerImage from '../../../components/upImage'//上传横幅组件
import backgroundImage from '../../../components/upImage'//上传背景组件
export default{
  data(){
      return {
          imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',
          saveUrl : '/conversation/updateConversation'
      }
  },
  props : ['datas'],
  components : {upImage,backgroundImage,cardBannerImage},
  mounted(){
    this.init();
  },
  methods : {
      init(){//初始化
          this.$refs.upImage.imageUrl= this.imgUrl+this.datas.photo;//设置默认头像
          this.$refs.cardBannerImage.imageUrl= this.imgUrl+this.datas.cardBanner;//设置默认横幅
          this.$refs.backgroundImage.imageUrl= this.imgUrl+this.datas.background;//设置默认背景
      },
      savePhoto(){//修改贴吧照片的方法
          //判断如果当前的imgId为空表示用户没有替换图片，提示保存成功
          if(this.$refs.upImage.imgId == ''){
            this.$alert('编辑成功','提示');
            return;
          }
          this.common.ajax({
              url : this.saveUrl,
              data : {
                  id : this.datas.id,
                  token : this.getToken(),
                  photo : this.$refs.upImage.imgId//修改后的图片id
              },
              success : (result)=>{
                  if(result.success){
                      this.$alert(result.message,'提示')
                  }else{
                    this.$alert(result.message,'提示')
                  }
              },
              error : ()=>{
                  throw "修改失败"
              }
          })
      },
      saveCardBanner(){//修改贴吧横幅的方法
          //判断如果当前的imgId为空表示用户没有替换图片，提示保存成功
          if(this.$refs.cardBannerImage.imgId == ''){
            this.$alert('编辑成功','提示');
            return;
          }
          $.ajax({
              url : this.saveUrl,
              data : {
                  id : this.datas.id,
                  token : this.getToken(),
                  cardBanner : this.$refs.cardBannerImage.imgId//修改后的图片id
              },
              success : (result)=>{
                  if(result.success){
                      this.$alert(result.message,'提示')
                  }else{
                    this.$alert(result.message,'提示')
                  }
              },
              error : ()=>{
                  throw "修改失败"
              }
          })
      },
      saveBackground(){//修改贴吧背景的方法
          //判断如果当前的imgId为空表示用户没有替换图片，提示保存成功
          if(this.$refs.backgroundImage.imgId == ''){
            this.$alert('编辑成功','提示');
            return;
          }
          $.ajax({
              url : this.saveUrl,
              data : {
                  id : this.datas.id,
                  token : this.getToken(),
                  background : this.$refs.backgroundImage.imgId//修改后的图片id
              },
              success : (result)=>{
                  if(result.success){
                      this.$alert(result.message,'提示')
                  }else{
                    this.$alert(result.message,'提示')
                  }
              },
              error : ()=>{
                  throw "修改失败"
              }
          })
      }
  }
}
</script>
<style>
.center-pageSetting{
  width : 33.33333%;
  border-right:1px solid #e1e1e1;
  height:100%;
}
</style>
