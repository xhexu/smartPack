<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>

<script>
import topBar from './components/topBar.vue'
export default {
  name: 'App',
  components: {
    topBar
  }
}
</script>

<style>
html,body{
  height:100%;
  width:100%;
  border:hidden;
  overflow:hidden;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: url('assets/bg.png')
}
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
a {
  color: #42b983;
}
.anchorBL{display:none;}
</style>
