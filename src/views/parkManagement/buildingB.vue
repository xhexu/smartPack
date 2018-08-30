<template>
  <el-row style="margin-top: 30px;">
    <el-col :span="6" :offset="2" class="left">
      <img class="imgT" src="../../assets/building_top.png"/>
      <div class="view">
        <img src="../../assets/building.png"/>
      </div>
      <img class="imgB" src="../../assets/building_top.png"/>
    </el-col>
    <el-col :span="1" :offset="1" class="center">
      <ul>
        <li>12</li>
        <li>11</li>
        <li>10</li>
        <li>9</li>
        <li>8</li>
        <li>7</li>
        <li>6</li>
        <li>5</li>
        <li>4</li>
        <li>3</li>
        <li>2</li>
        <li>1</li>
      </ul>
    </el-col>
    <el-col :span="14" class="right">
      <div class="content"></div>
      <el-row>
        <el-col :span="6">8F</el-col>
        <el-col :span="18">

        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .left{
    .imgT{width:100%;}
    .view{
      width:95%;margin: -15px auto;background:url('/static/bg_view.png') no-repeat center;background-size: 100% 100%;
      img{width:80%;margin: 120px auto;}
    }
    .imgB{width:100%;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);}
  }
  .center{
    ul{
      li{width:100%;width:40px;height:40px;background:url('/static/btn_build_index.png') no-repeat center;background-size: 100% 100%;margin-bottom:3px;line-height: 40px; color:white;font-weight: bold;
        cursor: pointer;}
    }
  }
  .right{
    .content{width:60%; height:500px;background:url('/static/bg_manage_content.png') no-repeat center;background-size: 100% 100%; margin: 40px 0 0 20px;}
  }
</style>
