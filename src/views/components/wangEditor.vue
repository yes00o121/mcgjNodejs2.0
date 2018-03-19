//富文本框组件
<template>
  <div class="wangEditor-core">
    <div  id="conversationChildChildEditor">

    </div>
    <el-button class="wangEditor-reply" type="primary"  @click="publish">发布</el-button>
  </div>

</template>
<script>
import WangEditor from 'wangeditor' //引入富文本框
import baseConfig from '../../../config/baseConfig'
export default {
  data(){
    return {
        imgUrl  : baseConfig.localhost,
        context : ''
    }
  },
  mounted(){
      this.editor = new WangEditor('#conversationChildChildEditor');
      this.config();
      window.a = this.editor;
      this.editor.customConfig.uploadImgShowBase64 = true;//显示本地上传图片功能
      this.editor.create();//创建富文本框
      this.zIndex();
      this.hideMenu();
  },
  methods : {
      hideMenu(){//隐藏菜单
          var menu = this.editor.$toolbarElem[0].children;
          menu[0].style.display="none"
          menu[1].style.display="none"
          menu[2].style.display="none"
          menu[3].style.display="none"
          menu[4].style.display="none"
          menu[5].style.display="none"
          menu[6].style.display="none"
          menu[7].style.display="none"
          menu[8].style.display="none"
          menu[9].style.display="none"
          menu[10].style.display="none"
          menu[13].style.display="none"
          menu[15].style.display="none"
          menu[16].style.display="none"
          menu[17].style.display="none"
          for(var i=0;i<menu.length;i++){
              menu[0].style.display="none"
          }
      },
      analysisText(){//解析富文本框中的数据，转换为可以储存在数据库中的数据格式
          var result = this.editor.getJSON();
          for(let i=0;i<result.length;i++){//遍历数据，重新组装
              for(let j=0;j<result[i];j++){//遍历子标签
                  if(result[j] == 'img'){
                      //获取图片的属性
                  }
              }
          }
      },
      zIndex(){//修改富文本框的显示级别
          var nodes = document.getElementById('conversationChildChildEditor').children;
          var nodeChilds = nodes[0].children;
          for(var j = 0;j<nodeChilds.length;j++){
              nodeChilds[j].style.zIndex=600;
          }
          nodes[1].style.zIndex=600;

      },
      upImage(){//上传图片到mongdo数据库
          var imgs = $(document.getElementById('conversationChildChildEditor')).find('img');//获取文本框的图片
      },
      config(){//配置
          this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
          this.editor.customConfig.showLinkImg = false;//隐藏上传网络图片功能
          this.editor.customConfig.uploadImgServer = baseConfig.localhost+'/common/uploadFile'//上传图片的服务器地址
          this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;//限制图片大小为3M
          this.editor.customConfig.uploadImgMaxLength = 10;//限制上传图片的数量
          this.editor.customConfig.uploadImgTimeout = 3000;//图片超时时长
          this.editor.customConfig.uploadFileName = 'file'//自定义上传文件名称
          this.listeners();
      },
      publish(){//发表楼层的方法
          if(this.editor.txt.text().replace(/&nbsp;/gi,'').trim() == '' && this.editor.txt.html().indexOf('src') == -1){
              this.$alert('请输入','提示');
              return;
          }
          this.$emit('onPublish',this.editor.txt.html())//将数据传输到父组件中进行处理
      },
      listeners(){//监听方法
        this.editor.customConfig.uploadImgHooks = {//监听图片的上传
            before: function (xhr, editor, files) {
                console.log('之前监听')
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {//没有按照wangEditor格式返回json对象无法执行
                console.log('成功监听。。')
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: (xhr, editor, result) => {//不使用wangEditor的接口返回数据，在错误消息中自定义数据的处理
                console.log('失败监听')
                let url = this.imgUrl+result;
                this.editor.txt.append('<img src='+url+'>')
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                console.log('错误监听')
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                console.log('超时监听')
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                console.log('返回配置')
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.url
                insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
          }
          //上传图片错误窗口自定义
          this.editor.customConfig.customAlert = function (info,a,b) {
            // info 是需要提示的内容
            //alert('自定义提示：' + info)//去除提示窗口
          }
    }
  }
}
</script>
<style>
.wangEditor-core{
  padding: 50px;
}
.wangEditor-reply{
  margin-top:20px;
}
</style>
