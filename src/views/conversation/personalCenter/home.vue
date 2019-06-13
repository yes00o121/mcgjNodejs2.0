//主页组建
<template>
  <div class="home-core">
      <div v-if="isFollowConversation" style="margin-left: 20px;">
          <h1 class="ihome_title"><span class="cut_line">|</span>关注的吧</h1>
          <div>
              <span v-for="data,index in datas" >
                    <span v-if="index<8">
                      <router-link :to="{path:'/conversationChild',query : {conversationId:data.conversationId,start:1}}" target="_blank">
                        <el-button v-if="index<7"  size="mini" type="primary" plain class="home-followButton" >
                          <span>{{data.conversationName}}</span>
                        </el-button>
                      </router-link>
                    </span>
                    <el-button v-else class="home-followButton" size="mini" type="primary" plain>
                      查看全部
                    </el-button>
              </span>
          </div>
          <h1 class="ihome_title"><span class="cut_line">|</span>最新动态</h1>
          <div>
              <div v-for="data,index in newConversations" style="padding-bottom: 10px;display: flex;margin-bottom:14px;margin-top:14px;border-bottom: 1px dotted #E1E3E6;">
                <div style="margin-right: 20px;">
                    <img v-bind:src='imgUrl+data.photo' style="width:43px;height:43px;">
                </div>
                <div>
                    <div style="font-size:12px;margin-bottom:15px;">
                        <router-link :to="{path:'/conversationChild',query : {conversationId:data.conversationId,start:1}}" target="_blank">
                          {{data.conversationName}}
                        </router-link>
                    </div>
                    <div style="font-size:14px;color:#2962B6;line-height: 14px;margin-bottom: 2px;">
                    <router-link :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}" target="_blank">
                      {{data.title}}
                    </router-link>
                    </div>
                    <div v-html="conversationChildFilter(data.content)">

                    </div>
                    <div style="padding-top: 2px;font-size:12px;color:#999">
                        <a href="#" style="color:#999;">{{data.userName}}</a>
                        <span style="padding-left:21px;">{{handlerDate(data.lastTime)}}</span>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div v-else = "isFollowConversation">
          <h1 class="home-noFollow">
            你还没有关注的贴吧哦,快去关注吧
          </h1>
      </div>
  </div>
</template>
<script>
import baseConfig from '../../../../config/baseConfig'
export default {
    data(){
        return {
            isFollowConversation : false,//用户是否关注了贴吧,默认没有
            url : "/conversation/selectConversationFollow",//查询用户关注的贴吧
            userFollowUrl : '/conversation/selectUserFollowConversation',//查询用户关注的贴吧下最新的动态数据
            datas : [],//用户关注的贴吧数据
            imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',//图片地址
            newConversations : {}//用户关注的贴吧最新数据
        }
    },
    mounted(){
        this.init();
        this.append();
        window.onload = ()=>{
            //this.append();
        }
    },
    methods:{
        init(){
            this.selectFollow();
            this.selectUserFollowConversation();
        },
        selectFollow(){//查询用户关注的贴吧
            this.common.ajax({
              url : this.url,
              data : {
                userId : this.getUser().id
              },
              success : (result)=>{
                  if(result.success){
                      result = result.result;
                      if(result.length>0){//用户关注的贴吧大于0
                        this.datas = result;
                        this.isFollowConversation = true;//用户有关注的贴吧
                      }
                  }else{
                      this.$alert(result.message,'提示');
                  }
              }
            })
        },
        selectUserFollowConversation(){//查询用户关注的贴吧下最新的动态数据
            this.common.ajax({
                url : this.userFollowUrl,
                async:false,
                data : {
                    id : this.getUser().id,
                    token : this.getToken()
                },
                success : (result)=>{
                    if(result.success){
                        this.newConversations = result.result;
                    }
                }
            })
        },
        append(){//追加数据
            this.appendText();
        },
        appendText(){//追加贴子文字内容
          setTimeout(()=>{//暂时写成延迟加载
            for(let i=0;i<this.newConversations.length;i++){
                if(this.newConversations[i].content == null)
                  continue;
                //var text = this.getChinalCharacters(this.newConversations[i].content);//获取提取后的汉字
                let text = this.newConversations[i].content;
                if( text != null && text.length>40){//如果大于指定字数,删除后续汉字
                    text = text.substring(0,40)+".....";
                }
                document.getElementById('personalConter_home'+this.newConversations[i].id).innerHTML=text;
                this.appendImage(this.newConversations[i]);
            }
          })
        },
        appendImage(data){//追加图片,参数为需要解析的标签字符串和贴吧对象
            var html = data.content;//获取内容标签
            if(html != null){
              var html2 = html;
              var index = 0;//记录添加的图片数量
              for(let i = 0;i<3;i++){
                var first = html2.indexOf('src="');
                if(first == -1){//表示用户发表的贴子内容没有附带图片，直接退出
                    break;
                }
                first+=5;//获取第一张图片开始位置,加上字符串的长度
                var text = html2.substring(first,html2.length);//地址开始位置截取到末尾
                var last = text.indexOf('" />');
                if(last == -1){
                    last = text.indexOf('">');
                }
                var address = text.substring(0,last);//截取到图片地址末尾
                //如果该地址是正常的图片地址追加显示
                if(address.indexOf('img.t')==-1 && address != ""){
                      $('#personalConter_home_image_'+data.id).append(`
                          <li style="height: 100%;margin-left: 0px;">
                            <img style="height:100%" src= "${address}">
                          </li>
                      `);
                      index++;//添加了图片，记录索引
                }
                //获取实际的最后一个">位置
                var actualLast = html2.indexOf('">')+2;
                //如果actualLast小于first表示没有取到图片之后的位置,继续获取
                  if(actualLast<first){
                      actualLast = last+first;
                  }
                //获取截取图片之后的字符串
                html2 = html2.substring(actualLast,html.length);
              }
              //如果循环结束了index还是为0，表示用户没有发表图片，删除图片div
              if(index == 0){
                  $('#personalConter_home_image_'+data.id).remove();
              }
            }

        },
        getChinalCharacters(html){//提取出标签内的文字
            var reg=/[\u4E00-\u9FA5]/g;
            var result=html.match(reg,'');
            if(result != null){
                return result.join().replace(/,/g,'');
            }
            return '';

        },
    }
}
</script>
<style>
.home-core{
  /*height :  300px;*/
}
.home-noFollow{
  text-align: center;
  font-size: 18px;
}
.home-followButton{
  margin-bottom:20px;
  width:124px;
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  text-align: left;
  margin-right: 20px;
}
.ihome_title{
    font-weight: 400;
    font-family: STHeiti,"Microsoft Yahei",Arial,SimSun,sans-serif;
    font-size: 14px;
    color: #494a4c;
    line-height: 18px;
}
.cut_line{
  color: #4585E6;
  font-size: 14px;
  vertical-align: top;
  font-weight: 700;
  line-height: 16px;
  margin-right: 4px;
}
</style>
