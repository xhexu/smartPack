<template>
  <div>
    <el-row>
      <el-col :span="7" class="left">
        <div class="boxA">
          <b>A</b>
          <p>本栋共4层</p>
          <p>入驻企业6家</p>
          <p>企业类型包含餐饮，金融，IT等</p>
          <router-link class="btn" to="/buildingA">进入本栋</router-link>
        </div>
      </el-col>
      <el-col :span="10" class="center">
        <img class="imgT" src="../../assets/top_bar.png"/>
        <div class="view">
          <img src="../../assets/building.gif"/>
        </div>
        <img class="imgB" src="../../assets/top_bar.png"/>
      </el-col>
      <el-col :span="7" class="right">
        <div class="boxB">
          <b>B</b>
          <p>本栋共12层</p>
          <p>入驻企业62家</p>
          <p>企业类型包含餐饮，金融，制造，IT，服务业等</p>
          <router-link class="btn" to="/buildingB">进入本栋</router-link>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">&nbsp;</el-col>
      <el-col :span="10">
        <nav-bar></nav-bar>
      </el-col>
      <el-col :span="7">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
  import navBar from '../../components/navBar.vue'
  require('vue2-animate/dist/vue2-animate.min.css')

  export default {
    components: {
      navBar
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .boxA{
    background: url('/static/divTL.png') no-repeat;background-size: 100% 100%;width:40%;font-size: 14px;color:#01A4AE;font-weight: bold;padding:100px 0 50px 80px;text-align: left;
    margin: 100px auto 0; position: relative;
    b{color:red;position: absolute;font-size: 16px; top:32px;left:32px;}
    a.btn{display: block;width:156px; height:44px; margin: 30px auto 0; line-height: 44px;text-align: center;background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
    text-decoration: none;color:#ccc;}
  }
  .boxB{
    background: url('/static/divTR.png') no-repeat;background-size: 100% 100%;width:40%;font-size: 14px;color:#01A4AE;font-weight: bold;padding:100px 60px 50px 40px;text-align: left;
    margin: 100px auto 0; position: relative;
    b{color:red;position: absolute;font-size: 16px; top:34px;right:34px;}
    a.btn{display: block;width:156px; height:44px; margin: 30px auto 0; line-height: 44px;text-align: center;background: url('/static/bg_btn.png') no-repeat;background-size: 100% 100%;cursor: pointer;
      text-decoration: none; color:#ccc;}
  }
  .left{}
  .center{
    .imgT{width:100%;}
    .view{
      width:95%;margin: -15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;
      img{width:100%;margin: 80px auto 10px;}
    }
    .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
  }
  .right{}
</style>
