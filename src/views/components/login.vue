//用户登录组件
<template>
<el-dialog
  title="登录"
  :visible.sync="dialogVisible"
  width="20%"
  :before-close="handleClose">
  <el-form label-width="80px" ref="form" :model="form">
    <el-form-item label="账号"  class="login-input">
      <el-input v-model="form.account" ></el-input>
    </el-form-item>
    <el-form-item label = "密码" class="login-input">
        <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label = "验证码" style="width:200px">
        <el-row >
          <el-col :span="10">
              <el-input v-model="form.checkCode" style="width:120px;"></el-input>
          </el-col>
          <el-col :span="6">
              <img :src="yzUrl" class="login-verificationCode" @click="loadverificationCode"/>
          </el-col>
        </el-row>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add" >确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
import baseConfig from '../../../config/baseConfig'
export default {
  data(){
    return {
      dialogVisible : false,//窗口显示控制
      form : {
          account : '',
          password : '',
          checkCode : '',
          verificationCode : localStorage.verificationCode
      },
      yzUrl : baseConfig.localhost+'/common/generateVerification?verificationCode='+localStorage.verificationCode,
      loginUrl : baseConfig.localhost+'/user/login'
    }
  },
  methods : {
    show(){
      //显示登录窗口
      this.dialogVisible =true;
    },
    handleClose(done) {//关闭窗口
          done();
    },
    add(){//用户登录方法
        $.ajax({
            url : this.loginUrl,
            data : this.form,
            type : 'post',
            success:(result)=>{
                  if(result.success){
                      this.dialogVisible = false;//关闭窗口
                      //登录成功将返回的token存入localStorage中，刷新页面
                      this.setUser(result.result);//将user写入localStorage中
                      location.reload();//页面重新加载
                      //this.$router.push({
                      //  path : '/'
                      //})
                  }else{
                    this.$alert(result.message,'提示');
                  }
            },
            error : ()=>{
                throw "登录失败";
            }
        })
    },
    loadverificationCode(e){//加载验证码方法
        e.target.src = this.yzUrl+'&random='+Math.random();
    }
  },
}
</script>
<style>
.login-input{
  width : 300px;
}
.login-verificationCode{
    margin-left:90px;
    cursor:pointer;
}
</style>
