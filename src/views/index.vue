<template>
  <div id="main">
    <top-bar class="header"></top-bar>
    <router-view class="content"></router-view>
    <div class="navBar">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
  import topBar from '../components/topBar.vue'
  import navBar from '../components/navBar.vue'
  export default {
    components: {
      topBar,
      navBar
    }
  }
</script>
<style scoped lang="scss">
  #main {
    height: 100%;
    background: url('../../static/bg.png');
    background-color: rgb(0,0,0);
    .header{
      width:100%;
      height:13%;
    }
    .content{
      width:100%;
      height:75%;
    }
    .navBar{
      width: 100%;
      height:12%;
      display:flex;
    }
  }
</style>
