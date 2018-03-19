<!-- 主控件，包含左中右三个控件-->
<template>
    <div>
      <div style="width:100%;display: flex;">
          <card style="width:100%;padding-top: 30px;padding-bottom: 30px;"></card>
      </div>
      <div>
          <homeBodyLeft></homeBodyLeft>
          <homeBodyCenter></homeBodyCenter>
          <homeBodyRight></homeBodyRight>
      </div>
    </div>
</template>
<script>
import homeBodyLeft from './left/home-body-left'//左侧组件
import homeBodyRight from './right/home-body-right'//右侧组件
import homeBodyCenter from './center/home-body-center'//中心组件
import card from './home-card'//卡片组件
export default {
  data(){
    return {};
  },
  components : {homeBodyLeft,homeBodyRight,homeBodyCenter,card}
}
</script>
<style>
</style>
