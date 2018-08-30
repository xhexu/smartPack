<template>
  <div>
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
</style>
