//注册新贴吧组件
<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="20%"
    :before-close="handleClose">
    <el-form label-width="80px" ref="form" :model="form">
      <el-form-item label="贴吧名称">
      <el-input v-model="form.conversationName"></el-input>
      </el-form-item>
      <el-form-item label = "贴吧类型">
          <comSelect :codeValue="codeValue" ref="comSelect"></comSelect>
      </el-form-item>
      <el-form-item label = "贴吧头像">
          <comImage ref="comImage"></comImage>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="add" >确 定</el-button>
    </span>
    <!-- 登录窗口 -->
    <comLogin ref="comLogin"></comLogin>
    </el-dialog>
</template>
<script>
import comSelect from '../components/select'//引入下拉选组件
import comImage from '../components/upImage'//引入图片上传组件
import comLogin from '../components/login' //引入登录窗口组件
import baseConfig from '../../../config/baseConfig'//配置
  export default {
    data(){
      return {
          dialogVisible: false,
          form : {
            conversationName : '',//贴吧名称
            photo : '',//贴吧照片
            conversationType : '',//贴吧类型
          },
          url : baseConfig.localhost+'/conversation/addConversation',
          codeValue : 'conversation_type'//下拉选数据类型
      }
    },
    components : {comSelect,comImage,comLogin},
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      add(){//新增贴吧方法
          if(!this.isLogin()){//判断用户是否登录
              return;//没有登录
          }
          var user = JSON.parse(localStorage.user);
          var conversationType = this.$refs.comSelect.value;//获取当前选中的类型id
          var photo = this.$refs.comImage.imgId;//获取图片id
          $.ajax({
            url : this.url,
            data : {
                conversationType,
                photo,
                token : user.token,
                conversationName : this.form.conversationName
            },
            success:(result)=>{
                  if(result.success){
                      this.$alert(result.message,'提示');
                      this.reset();
                  }else{
                      this.$alert(result.message,'提示');
                  }
            },
            error:()=>{
                throw "新增失败";
            }
          })
      },
      reset(){
          this.form.conversationName= '';
          this.form.photo= '';
          this.form.conversationType= '';
          this.dialogVisible = false;
      },
      selectEvent(e){

      }
    }
  }
</script>
<style>

</style>
