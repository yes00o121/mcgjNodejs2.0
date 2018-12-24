//全局方法定义
import Vue from 'vue'


//定义全局放大图片方法
window.bigImg = (img)=>{
  $('body').append(`
        <div id="bigImg" onclick="$('#bigImg').remove()">
          <div  class="v-modal" tabindex="0" style="z-index: 2001;">
          </div>
          <div class="el-message-box__wrapper" style="z-index:2050" >
              <div class="el-message-box" style="width: auto;border: 1px solid #606266;padding-bottom:0;background-color:transparent;border:hidden;-webkit-box-shadow: black;box-shadow: none;">
                  <div>
                        <img style="width:100%;" src="${img}">
                  </div>
              </div>
          </div>
        </div>
    `)
  //  <div class="el-message-box__wrapper" style="z-index:2050" >
    //    <img style="width:auto;" src="${img}">
    //</div>
    //style="z-index: 2050;position: fixed;top:0;width: 100%;text-align: center;height: 100%;margin-left: 10px;overflow-y: auto;"
}

//过滤贴子内容的html标签，将图片和内容分开展示
Vue.prototype.conversationChildFilter = (data)=>{
    let element = "";//重组的元素
    var content = getElementContent(data);//获取标签中的内容
    if(content != null && content != ""){
        element += `<span style="font-size: 12px;color:#606266">${content}</sapn>`;
    }
    var imgArr = getImageElement(data);//获取图片数组
    if(imgArr != null && imgArr.length > 0){
        element += `<ul  style="margin: 10px 0 6px;height:100px;display: -webkit-box;overflow: hidden;width:500px;">`
        for(let i=0;i<imgArr.length;i++){
          element += `<li style="height: 100%;margin-right: 10px;">
                          ${imgArr[i]}
                        </li `;
                      //<img style="height:100%" src= "${imgArr[i]}">
        }
        element +=`</ul>`;

    }
    return element;
}


//获取标签中所有的img标签数组
var getImageElement = (elements)=>{
  if(elements == null){
    return null;
  }
  var tempStr = elements;//每次被修改的值
  var imgArr = [];//图片标签数组
  //默认取三张图片,循环三次就好
  for(let i=0;i<3;i++){
      let startIndex = tempStr.indexOf('<img');//获取开头的img标签位置
      if(startIndex == -1){
        break;//没有图片直接退出
      }
      tempStr = tempStr.substring(startIndex);//直接将前面的内容做掉,避免受到其他标签影响获取索引错误
      let endIndex = tempStr.indexOf('>')+1;//获取结尾标签
      var img = tempStr.substring(0,endIndex);
      img = img.replace(' ',' style="height:100%;cursor: pointer;"  onclick="bigImg(this.src)" ')//图片追加样式,第一个空格的位置追加样式
      imgArr.push(img);//获取图片元素
      //console.log(tempStr.substring(0,endIndex))
      //console.log(tempStr.substring(startIndex,endIndex))
      tempStr = tempStr.substring(endIndex);//直接将前面的内容做掉,避免受到其他标签影响获取索引错误
      //console.log(tempStr)
  }
  return imgArr;
}
Vue.prototype.test=function(){
  console.log('???')
}


//字符串过滤标签元素,返回除标签外的所有内容
var getElementContent = (element)=>{
    if(element == null){
      return "";
    }
    var chars = element.replace(/<.*?>/g,'').trim();
    //默认30个字符,超过用....结尾
    if(chars.length > 50){

      chars = chars.substring(0,50)+"...";
    }
    return chars;
}
