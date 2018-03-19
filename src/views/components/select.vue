//下拉选组件,使用时该组件绑定codeValue值,动态获取下拉选数据
<template>
    <el-select  v-model="value"  placeholder="请选择">
      <el-option v-for="data in datas" :label="data.dictName" :value="data.dictType" ></el-option>
    </el-select>
</template>
<script>
import baseConfig from '../../../config/baseConfig'//获取配置
  export default {
    data(){
      return {
        datas : [],
        value : '',//下拉选默认值
        url : baseConfig.localhost+'/dict/selectDictByCode'
      }
    },
    props : ['codeValue'],//接收父组件传入的参数
    mounted : function(){
        this.selectDictByCode();
    },
    methods : {
        selectDictByCode(){
          var _this = this;
            $.ajax({
                url : _this.url,
                data : {
                  codeValue : _this.codeValue
                },
                success : function(result){
                    if(result.success){
                        _this.datas = result.result;
                    }else{
                      throw "获取字典数据失败";
                    }
                },
                error : function(){
                  throw "获取字典数据失败";
                }
            })
        }
    }

  }
</script>
<style>

</style>
