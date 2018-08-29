<template>
  <div class="navBar">
    <ul>
      <li>
        <router-link to="index">经营分析</router-link>
      </li>
      <li>
        <router-link to="show">园区展示</router-link>
      </li>
      <li>
        <router-link to="management">园区管控</router-link>
      </li>
      <li><router-link to="">孵化管理</router-link></li>
      <li><router-link to="">视频监控</router-link></li>
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
  .navBar {
    ul {
      overflow: hidden;
      width: 750px;
      margin: 15px auto;
      li {
        float: left;
        margin: 0 15px;
        list-style: none;
        background: transparent url('/static/btn.png') no-repeat;
        background-size: 100% 100%;
        font-size: 14px;
        color: #01A4AE;
        font-weight: bold;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        a {
          display: block;
          width: 120px;
          height: 40px;
          text-decoration: none;
          color: #01A4AE;
        }
      }
      li:hover {
        background-image: url("/static/btn_active.png");
        color: #bb4b00;
        a {
          text-decoration: none;
          color: #bb4b00;
        }
      }
    }
  }
</style>
