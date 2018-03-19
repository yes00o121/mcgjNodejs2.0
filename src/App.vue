<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
localStorage.setItem("verificationCode",new Date().getTime()+Math.random())//用户访问时随机生成验证唯一标识
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user : ''
    }
  },
  mounted(){

  },
  watch : {
      user(){
          console.log('!!!!!!!!')
      }
  }
}
</script>

<style>


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a{
  text-decoration:none;
  color:black;
}

</style>
