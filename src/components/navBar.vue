<template>
  <div class="navBar">
    <ul>
      <li>经营分析</li>
      <li>园区展示</li>
      <li>园区管控</li>
      <li>孵化管理</li>
      <li>视频监控</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.navBar{
	ul{
    overflow: hidden;width:750px;margin: 15px auto;
    li{float: left;width:120px; height:40px; margin: 0 15px; list-style: none;
      background:transparent url('/static/btn.png') no-repeat;background-size:100% 100%;
      font-size: 14px;color: #01A4AE; font-weight: bold; line-height: 40px; text-align: center;
    }
    li:hover{background-image: url("/static/btn_active.png"); color: #bb4b00;}
	}
}
</style>
