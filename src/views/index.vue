<template>
  <div id="main">
    <top-bar></top-bar>
    <router-view></router-view>
    
  </div>
</template>

<script>
import topBar from '../components/topBar.vue'

export default {
  components: {
    topBar
  }
}
</script>
<style scoped>
#main {
  height: 100%;
  background: url('../assets/bg.png')
}
</style>
