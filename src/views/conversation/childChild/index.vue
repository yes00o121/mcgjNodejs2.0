//贴吧子贴(会话)主页面
<template>
  <div class="conversation-child-child-core">
      <div>
      <div class="conversation-name">
        <router-link :to="{path : '/conversationChild',query : {conversationId : datas.conversationId,start:1}}">
          {{datas.conversationName}}吧
        </router-link>
      </div>
          <childChildTitle :datas = "datas" ref="childChildTitle" @singleFloor = "singleFloor"></childChildTitle>
          <!-- 楼层 -->
          <div v-for="(data,index) in floor.datas" class="conversation-child-child-floor" v-loading="loading" style="display: flex;">
              <div class="conversation-child-child-div-photo" style="">
                  <div v-if="data.isManage" class="louzhubiaoshi"></div>
                  <div style="padding-top:20px;">
                    <router-link :to="{path : '/personalCenter',query : {}}">
                      <img  class="conversation-div-photo-img" v-bind:src="imgUrl+data.photo"><br/>
                    </router-link>
                    <p style="margin-top:10px;">{{data.userName}}</p>
                  </div>
              </div>
              <div class="conversation-child-child-div-content" style="">
                <div v-bind:id="'post_content_'+data.id" class="conversation-child-child-size">
                    <!--  内容为标签使用jquery动态追加 -->
                </div>
              </div>
              <div class="conversation-child-child-floor-time">
                  {{(index+1)+(floor.start-1)*floor.limit}}楼
                  {{data.createDate}}
              </div>
          </div>
          <page ref="page" :currentPage = "parseInt(floor.start)" @getPage= "getPage"></page>
          <wangEditor id="wangEditor" ref = "wangEditor" @onPublish="publish"></wangEditor>
      </div>
      <login ref="login"></login>
  </div>
</template>
<script>
import baseConfig from '../../../../config/baseConfig'//配置
import replyPanel from '../../components/replyPanel'//回复面板组件
import login from '../../components/login'//登录组件
import page from '../../components/page'
import wangEditor from '../../components/wangeditor' //引入富文本框
import childChildTitle from './components/title'//引入标题组件
export default {
    data(){
      return {
          url : '/conversationChild/selectConversationChildById',//接收贴吧名称当前贴子标题等数据
          floorUrl : '/conversationChildChild/selectCCCByCCId',//当前帖子的楼层回复数据
          imgUrl : baseConfig.localhost+baseConfig.imgUrl+'?imgId=',//图片url
          publishUrl : '/conversationChildChild/addConversationChildChild',//发布楼层url
          datas : '',//贴吧名称当前贴子标题等数据
          floor : {//楼层数据
              datas : '',
              start : this.$route.query.start,//开始页,不能为0或负数
              limit : 30,//结束页
              total : ''
          },
          loading : true,//遮罩层
          id : ''//当前帖子的id
      }
    },
    created(){

    },
    mounted(){//加载页面数据
      var params = this.$route.query;//获取参数
      //设置当前帖子id
      this.id = params.id;
      this.init();//初始化页面数据
      window.onload = ()=>{
          this.append();
      }
    },
    updated(){//DOM渲染
      /*
        setTimeout(()=>{
          var datas = this.floor.datas;
          for(let i = 0;i<datas.length;i++){
              $('#post_content_'+datas[i].id).text('');
              var imgs = $('#post_content_'+datas[i].id).find('img');
              $('#post_content_'+datas[i].id).append(datas[i].content)
              //设置如果图片宽度大于当前内容行的宽度啊，将图片宽度修改为100%避免图片的溢出
              for(var j=0;j<imgs.length;j++){
                  if(imgs[j].width>imgs[j].parentElement.clientWidth){
                      imgs[j].style.width="100%"
                  }
              }
          }
        },200)
        */
    },
    components : {replyPanel,login,page,wangEditor,childChildTitle},//引入组件
    watch:{
            'floor.total'(val){//总数被修改时触发
                this.$refs.page.total = this.floor.total;//修改分页组件的总数
            },
            'floor.limit'(val){//页数,如需调整显示页数页进行更新
                this.$refs.page.size = val;//修改分页组件的总数
            }
    },
    methods : {
        append(){//追加面板数据
          var datas = this.floor.datas;
            for(let i = 0;i<datas.length;i++){
            $('#post_content_'+datas[i].id).append(datas[i].content);//追加楼层内容
            //判断楼层图片是否超出当前的宽度，如果超出将其宽度设置为100%
            var imgs = $('#post_content_'+datas[i].id + ' img');
            var width = $('#post_content_'+datas[i].id).width()//当前区域宽度
                imgs.each(function(a,value){
                  value.onload = function(){
                    var labelWidth = value.width//标签宽度
                    if(labelWidth > width){
                        value.style.width="100%"
                    }
                  }

                })
          }

        },
        init(){
          this.$refs.page.size = this.floor.limit;//设置分页组件的页数
          this.getData();//获取标题等数据
          this.getfloorDatas();//获取楼层数据
        },
        getData(){//获取贴吧名称当前贴子标题等数据
            var id = this.id;
            this.common.ajax({
                url : this.url,
                type : 'post',
                async : false,//同步加载
                data : {
                    id,
                    token : this.getToken()
                },
                success : (result)=>{
                    if(result.success){
                        this.datas = result.result;
                        document.title=this.datas.title;//修改标题
                        this.loading = false;//关闭遮罩
                    }else{
                      //找不到该帖的数据跳转错误页面
                      this.$router.push({
                          path : '/error'
                      })
                    }
                }
            })
        },
        singleFloor(e){//只看楼主数据
            this.getfloorDatas();//刷新数据
        },
        getfloorDatas(){//获取楼层数据
        var conversationChildId = this.id;
        var start = this.floor.start;//开始页
        var limit = this.floor.limit;//页数
        this.common.ajax({
            url : this.floorUrl,
            async : false,//同步加载
            data : {
                conversationChildId,
                start,
                limit,
                token : this.getToken(),
                singleFloor : this.$refs.childChildTitle.lookFollr
                //是否只看楼主,默认为查询所有
            },
            success : (result)=>{
                if(result.success){
                    this.floor.datas = result.result.conversationChildChilds;
                    this.floor.total = result.result.size;
                }else{
                  throw "加载失败";
                }
            }
        })
        },
        publish(content){//发布方法,接收子组件数据
          if(!this.isLogin()){//判断用户是否登录
              return;//没有登录
          }
          if(content== '' || content== null){//判断数据合法性
            this.$alert('请输入!','提示')
            return;
          }
          this.addFloor(content);//发布楼层数据
        },
        addFloor(content){//添加楼层方法
            var user = this.getUser();//获取当前用户信息
            var conversationChildId = this.id;//获取当前帖子id
            //获取当前状态，判断是否楼主
            var isManage = 0;//默认不是
            if(user.id == this.datas.userId){
                isManage = 1;
            }
            this.common.ajax({
                url : this.publishUrl,
                data : {
                  conversationChildId,
                  userId : user.id,
                  content,
                  isManage,
                  token : user.token
                },
                success : (result)=>{
                    if(result.success){
                        //this.getfloorDatas();
                        location.reload();
                    }else{
                        if(result.state == 2){
                          this.$alert(result.message,'提示',{
                            callback:action=>{
                              this.reset();//清空并且刷新页面
                            }
                          });
                        }
                    }
                }
            })
        },
        getPage(val){//获取子组件当前页数据
          //this.floor.start = val;//更新页数
          //this.getfloorDatas();
          location.href = 'conversationChildChild?id='+this.id+'&start='+val;
        },
        updateFloor(val){

        }
    }
}
</script>
<style>
.conversation-name{
    padding : 10px;
    border-bottom: 1px solid #DCDCDC;
}
.conversation-title{
    padding : 10px;
    border-bottom: 1px solid #DCDCDC;
}
.conversation-child-child-floor{
    border-bottom : 1px solid #DCDCDC;
    position:relative;
    /*height : 200px;*/
}
.conversation-child-child-div-photo{
  width : 15%;
  /*height : 100%;*/
  text-align: center;
  font-size:12px;
  /*float : left;*/
  background-color:	#FAFAFA;
  position:relative;
}
.louzhubiaoshi{
  background : url('/static/img/pb_css_pic_a630a08.png') no-repeat -172px -120px;
  height:36px;
  width:36px;
  position:absolute;
  right : 0;
}
.conversation-child-child-div-content{
    width : 81%;
    position: relative;
    padding-top:2%;
    padding-left:2%;
}
.conversation-div-photo-img{
  width : 80px;
  height : 80px;
  padding:2px;
  border : 1px solid #DCDCDC;
}
.conversation-child-child-size{
    font-size:14px;
    line-height: 24px;
    word-wrap: break-word;
    margin-bottom : 40%;
}
.conversation-child-child-floor-time{
  bottom : 10px;
  right: 10px;
  color : #999;
  text-align: right;
  font-size:12px;
  position: absolute;
}
.conversation-child-child-core{
  border-right: 1px solid #ccc;
  border-let: 1px solid #ccc;
  width:980px;
  margin: 0px auto;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>
