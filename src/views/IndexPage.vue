<template>
  <div class="index">
    <div class="index_title">
      <img src="../assets/title.png">
    </div>
    <div class="index_content">
      <img src="../assets/top_bar.png">
      <div class="index_video">
      </div>
      <img style="-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);" src="../assets/top_bar.png">
    </div>
    <div class="index_btns">
      <div style="background: url('../assets/btn.png')">
        </div>
      <ul>
        <li style="background: transparent url('assets/btn.png') no-repeat 0 0">
          经营分析
        </li>
        <li>园区展示</li>
        <li>园区管控</li>
        <li>孵化管理</li>
        <li>视频监控</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      msg: '这是首页'
    }
  },
  method () {

  },
  beforeCreate () {

  },
  beforeMount () {

  },
  mounted () {

  },
  beforeUpdate () {

  },
  undated () {

  },
  beforeDestory () {

  },
  destoryed () {
    
  }
}
</script>

<!-- 首页样式 -->
<style lang="scss" scoped>
.index{
  &_title{
    font-size: 20px;
  }
  &_content{

  }
  &_video{
    min-height: 300px;
  }
  &_btns{

  }
}
</style>
