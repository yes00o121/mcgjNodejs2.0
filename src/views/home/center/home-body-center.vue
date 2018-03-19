<!-- 中间放置动态数据 -->
<template>
  <div class= "body-center-width">
      <div style="width:100%">
        <el-tabs id="homeBodyCenter" type="border-card">
          <el-tab-pane label="最新动态">
            <ul style="display:grid">
              <li v-for="data in datas" style="padding-bottom:24px;">
                  <div>
                    <div>
                      <div style="margin-bottom:5px;">
                        <router-link style="text-decoration:none;"  target="_blank" title="data.conversationName" :to="{path:'/conversationChild',query : {conversationId:data.childId,start:1}}">
                            {{data.conversationName}}吧
                        </router-link>
                      </div>
                    </div>
                    <div style="margin-bottom:5px;">
                      <router-link style="text-decoration:none;color:#2d64b3"  target="_blank" title="data.title" :to="{path:'/conversationChildChild',query : {id:data.id,start:1}}">
                          {{data.title}}
                      </router-link>
                      <span style="margin-left:10px;font-size:12px;">
                        <el-button size="mini" style="height:25px">{{data.replyNumber}}</el-button>
                      </span>
                    </div>
                    <div v-bind:id = "'post_content_home_'+data.id" style="font-size:14px;color:#666;line-height:24px">
                        <!-- 内容为追加显示 -->
                    </div>
                    <ul style="margin: 10px 0 6px;height:100px;display: flex;" v-bind:id = "'post_content_image_'+data.id">
                        <!-- 内容为追加显示 -->
                    </ul>
                    <div style="padding-top: 2px;font-size:12px;color:#999">
                        <img v-bind:src="imgUrl+data.photo" style="height: 15px;border-radius: 50%;">
                        <a href="#" style="color:#999;margin-left:5px;">{{data.userName}}</a>
                        <span style="padding-left:21px;">{{handlerDate(data.lastTime)}}</span>
                    </div>
                  </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        activeName: 'newest',
        newestUrl : this.baseConfig.localhost+'/conversation/selectNewestConversation',//最新数据
        imgUrl : this.baseConfig.localhost+this.baseConfig.imgUrl+'?imgId=',//图片url
        datas:[]//最新动态数据源
    };
  },
  mounted : function(){
    //window.onload = ()=>{//所有的数据加载完后执行
      this.findNewestConversation();//初始化时获取最新帖子动态数据源
      this.append();
    //}
  },
  updated(){

  },
  methods : {
      append(){//追加数据
          this.appendText();
      },
      appendText(){//追加贴子文字内容
        setTimeout(()=>{//暂时写成延迟加载
          for(let i=0;i<this.datas.length;i++){
              var text = this.getChinalCharacters(this.datas[i].content);//获取提取后的汉字
              if( text != null && text.length>60){//如果大于指定字数,删除后续汉字
                  text = text.substring(0,60)+".....";
              }
              document.getElementById('post_content_home_'+this.datas[i].id).innerHTML=text;
              this.appendImage(this.datas[i]);
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
              var last = text.indexOf('">');

              var address = text.substring(0,last);//截取到图片地址末尾
              //如果该地址是正常的图片地址追加显示
              if(address.indexOf('img.t')==-1 && address != ""&& address.indexOf('tb-video.bdstatic')==-1){
                    $('#post_content_image_'+data.id).append(`
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
                $('#post_content_image_'+data.id).remove();
            }
          }

      },
      getImageAddress(html){//取出标签内的图片地址,最大取三张，返回数组

      },
      getChinalCharacters(html){//提取出标签内的文字
          var reg=/[\u4E00-\u9FA5]/g;
          var result=html.match(reg,'');
          if(result != null){
              return result.join().replace(/,/g,'');
          }
          return '';

      },
      listenersScroll(){//监听滚动条
          var scrollHeight = //获取表格面板的高度，监听滚动条，超过高度进行绝对定位
          window.onscroll = ()=>{

          }
      },
      findNewestConversation : function(){//获取最新的动态数据源
          var _this = this;
          $.ajax({
              url : _this.newestUrl,
              type : 'post',
              async: false,
              success(result){
                if(result.success){
                    _this.datas = result.result;
                }else{
                  throw "获取动态数据失败";
                }
              }
          })
      },
      jump(){
          this.$router.push({
              path : '/conversationChildChild'
          })
      }
  }
}
</script>
<style>
.body-center-width {
  border : 1px soild #DCDCDC;
  width:60%;
  float : left;
  margin-left : 14px;
  font-family : Microsoft YaHei;
}
.body-cneter-alignment-ul{
  text-align:left;
  margin:20px 20px 20px 20px;
}
.body-cneter-alignment-li{
  text-align:left;
  margin-top:5px;
  width: 245px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.body-cneter-tag{
  margin-left:10px;
}
.body-cneter-content{
  margin-bottom:10px;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size:14px;
}
.body-cneter-spacing{
  margin-left:10px;
}
.body-cneter-font-size{
  font-size:14px;
}

</style>
