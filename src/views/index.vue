<template>
  <div id="main">
    <top-bar></top-bar>
    <router-view></router-view>
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
  .navBar{
  	width: 100%;
  	position: absolute;
  	bottom: 5%;
  	margin: 0 auto;
  }
}
</style>
