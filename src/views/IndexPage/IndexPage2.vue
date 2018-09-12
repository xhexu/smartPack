<template>
  <div class="index">
    <el-row style="height:50%">
      <el-col :span='7' :offset="1" style="height:100%">
        <ChartOne></ChartOne>
      </el-col>
      <el-col :span='7' :offset="1" style="height:100%;">
        <ChartTwo></ChartTwo>
      </el-col>
      <el-col :span='7' :offset="1" style="height:100%">
        <ChartThree></ChartThree>
      </el-col>
    </el-row>
    <el-row style="height:50%">
      <el-col :span='7' :offset="1" style="height:100%">
        <ChartFour></ChartFour>
      </el-col>
      <el-col :span='7' :offset="1" style="height:100%;">
        <ChartFour></ChartFour>
      </el-col>
      <el-col :span='7' :offset="1" style="height:100%">
        <ChartSix></ChartSix>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartOne from './one.vue'
import ChartTwo from './two.vue'
import ChartThree from './three.vue'
import ChartFour from './four.vue'
import ChartSix from './six.vue'


export default {
  name: 'IndexPage',
  components: {
    ChartOne,
    ChartTwo,
    ChartThree,
    ChartFour,
    ChartSix
  },
  data () {
    return {
    }
  },
  computed: {
    
  },
  mounted () {
  },
  methods: {
   
    
  }
}
</script>

<style lang="scss" scoped>
.index{
  height:100%;
  width: 100%;
  margin: 0 auto;
}
.el-col-offset-1{
  margin-left: 2.9%;
}
@media screen and (min-width: 1400px) { 
    
}
</style>