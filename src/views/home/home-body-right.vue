<!-- 右侧放置排行数据 -->
<template>
  <div class= "body-right-width">
    <!--
      <div >
          <ul>
            <li class="body-right-record-margin">
              <el-tag size="mini">1</el-tag>
              <span class="body-right-record-size">哈哈哈哈</span>
              <span style="float:right">547844</span>
            </li>
            <li class="body-right-record-margin">
              <el-tag size="mini">2</el-tag>
              <span></span>
              <span style="float:right">547844</span>
            </li>
          </ul>
      </div>
      -->
  </div>
</template>
<script>
export default {
  data(){
    return {};
  }
}
</script>
<style>
.body-right-width {
  height : 70%;
  width : 15%;
  /*border : 1px solid #DCDCDC;*/
  margin-top : 10px;
  display:inline;
  float : right;
}
.body-right-record-margin{
    margin:10px 10px 10px 10px;
    font-size:13px;
}
.body-right-record-size{
    width: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
