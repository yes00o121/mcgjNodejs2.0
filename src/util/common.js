import baseConfig from '../../config/baseConfig'
export default{
  //封装请求方法，默认携带用户token
  ajax(param){
    if(param == null){
      throw "参数异常";
    }
    //data默认添加用户token
    if(param.data == null){
        param.data = {};
    }
    //拼接域名
    param.url = baseConfig.localhost + param.url;
    param.data.token = this.user.getToken();
    if(!param.success){
      param.success =(res)=>{
          console.log('请求成功')
      }
    }
    if(!param.error){
      param.error =(res)=>{
        this.$alert(baseConfig.defaultErrorMessage,'提示');
      }
    }
    $.ajax(param)
  },
  //用户相关方法
  user : {
      //将user的值写入localStorage中
      setUser(user){
          localStorage.setItem("user",JSON.stringify(user));
      },
      //获取localStorage中的conversation数据
      getConversation(){
          return localStorage.currentConversation == null ? null : JSON.parse(localStorage.currentConversation);
      },
      //清空localStorage的用户数据,并且刷新页面
      reset(){
          localStorage.clear();
          location.reload();
      },
      //获取当前用户的token
      getToken(){
          return localStorage.user == null ? null : JSON.parse(localStorage.user).token;
      },
      //获取localStorage中的user数据
      getUser(){
          return localStorage.user == null ? null : JSON.parse(localStorage.user);
      },
      isLogin(){//全局方法，判断用户是否登录
        var user = localStorage.user;
        if(user != null && user != '' && user.substring(0,1)=='{' && user.substring(user.length,user.length-1) == '}'){
          //localStorage.user数据正常没有被用户修改过
          return true;
        }else{
          //用户没有登录,打开登录窗口
           this.$alert('请先登录!','提示');
           localStorage.clear();//重置用户
           //this.$refs.login.dialogVisible = true;
           //login.dialogVisible = true;
           return false;
        }
      }
  },
  //时间相关方法
  data:{
    //时间戳格式转换
    handlerDate(date){

      if(date == null || isNaN(date)){
          //return "数据异常";
          return null;
      }
      var time = new Date(date);
      //判断时间是否在今天内
      if(new Date().getYear() == time.getYear() && new Date().getMonth() == time.getMonth() && new Date().getDate() == time.getDate()){
          //获取时间进行小时和分钟的判断
          if(new Date().getTime()-time.getTime()<3600000){
            //在一小时内,计算出分钟数后返回
            return parseInt((new Date().getTime()-time.getTime())/1000/60)+"分钟前";
          }
          //不是一小时内的时间，获取小时候返回
          return parseInt((new Date().getTime()-time.getTime())/1000/60/60)+"小时前";
      }else{
        //时间不在今天,获取日期后返回
        return time.getMonth()+1+'-'+time.getDate();
      }
    }
  },
  //安全相关方法
  security : {

  },
  //系统配置相关
  systemConfig : {
      //根据Key获取配置数据
      getValue(key){
          this.ajax({
              url : this.baseConfig.systemConfig,
              success : (res)=>res
          })
      }
  }
}
