<template>
  <div style="position: relative;width: 100%;height: 50%">
    <div>
      <el-dialog :title="htmlTitle" :visible.sync="dialogFormVisible">
      <div style="max-width: 100%" v-html="htmlContent"></div>
      </el-dialog>
      <el-dialog :title="moreTitle" width="30%" :visible.sync="dialogFormVisible2">
        <ul >
          <li v-for="item in info" style="width: 100%;padding-top: 5px" @click="handleClick(item)" >
            <el-row :gutter="8">
              <el-col :title=item.title :span="16" style="cursor:pointer;font-size: 14px" align="left">
                {{ item.title.substr(0,17) }} <span v-if="item.title.length > 17">...</span>
              </el-col>
              <el-col :span="8" style="font-size: 12px"  align="center">{{ getFormtTime(item.checkTime) }}</el-col>
            </el-row>
          </li>
        </ul>
      </el-dialog>
    </div>
    <div class="card" :style="{backgroundImage: 'url(' + cardBgUrl + ')'}">
      <div class="card-title" :class="titleClass">{{title}}</div>
        <div  class="card-div nwwest-roll" style="overflow:hidden;clear:both;width: 90%;height: 80%"  :class="cardDivClass"  id="nwwest-roll">
          <ul >
            <li v-for="item in showInfo" style="width: 100%;padding-top: 5px" @click="handleClick(item)" :class="{anim:animate==true}">
              <el-row :gutter="8">
                <el-col :title=item.title :span="16" style="font-size: 14px" align="left">
                 {{ item.title.substr(0,7) }}...
                </el-col>
                <el-col :span="8" style="font-size: 12px"  align="center">{{ getFormtTime(item.checkTime) }}</el-col>
              </el-row>
            </li>
          </ul>
          <a @click="showMoreInfo" v-if="info.length>5" style="float: left;color:#01A4AE;cursor:pointer;"> more</a>
        </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
export default {
  name: 'hatchCard',
  props: {
    option: {
      type: Object,
      default () {
        return {}
      }
    },
    info: {
      type: Array,
      default () {
        return []
      }
    },
    moreTitle: ''
  },
  data () {
    return {
      showInfo: [],
      animate: true,
      cardDivClass: '',
      itemClass: '',
      titleClass: '',
      chartClass: '',
      cardBgUrl: '',
      title: '-----',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      htmlContent: '',
      htmlTitle: '',
      canScroll: true
    }
  },
  mounted () {
    this.dealChartOption()
    this.dealCardOption()
    // setInterval(this.scroll, 2000)
    let length = this.info.length
    this.showInfo = length > 5 ? this.info.slice(0, 5) : this.info
  },
  methods: {
    handleClick (item) {
      this.dialogFormVisible = true
      this.htmlContent = item.content
      this.htmlTitle = item.title
    },
    getFormtTime (time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d
    },
    dealChartOption () {
      if(_.isObject(this.chart)){
        this.chartOption = this.chart
      }
    },
    dealCardOption () {
      if(_.isObject(this.option)){
        if(!this.option.position){
          return;
        }
        if(this.option.title){
          this.title = this.option.title;
        }
        if(_.isObject(this.option.item)){
          _.extend(this.item,this.option.item)
        }
        switch(this.option.position){
          case 'TL':
            this.cardBgUrl = '/static/hatch_car_bg.png'
            this.titleClass = 'card-title-tl'
            this.cardDivClass = 'card-div-tl'
            break;
          case 'TR':
            this.cardBgUrl = '/static/hatch_car_right.png'
            this.titleClass = 'card-title-tr'
            this.cardDivClass = 'card-div-tl'
            break;
          default:
            console.error('卡片未匹配到')
        }
      }else{
        console.error('卡片入参异常')
      }
    },
    showMoreInfo() {
      this.dialogFormVisible2 = true
    }
  }

}

</script>

<style lang="scss" scoped>
  li:hover{
    color: #EB850C;
  }
  img {
    max-width: 100%;
  }
.card{
  position: relative;
      background-repeat: no-repeat;
      background-size:100% 100%;
      width:60%;
      height:100%;
      margin: 0 auto;
      &-item{
        position: absolute;
        color:#01A4AE;
        font-size: 14px;
        cursor: pointer;
        transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
      }
      &-div{
        position: absolute;
      li {
        display: block;
        color: #01A4AE;
        cursor: pointer;
        font-size: 18px;
      }
      li:hover{
        color: #EB850C;
      }
      }
      &-div-tl{
      left: 10px;
      top: 40px;
      }
      &-title{
        position: absolute;
        color: #01A4AE;
      }
      &-title-tl{
        height:30px;
        width:94px;
        left: 15px;
        top: 15px !important;
        padding-top: 10px;
        background:transparent url('/static/hatch_but_bg.png') no-repeat center;
      }
      &-title-tr{
        height:30px;
        width:94px;
        right: 15px;
        top: 15px !important;
        padding-top: 10px;
        background:transparent url('/static/hatch_but_bg.png') no-repeat center;
      }
  .newest-bill .nwwest-roll {
    padding-left: 15px;
    height: 210px;
    margin: 10px auto;
    overflow: hidden;
    transition: all 0.5s;
  }
  .newest-bill .nwwest-roll li{
    height: 35px;
    line-height: 35px;}
  .anim{
    transition: all 0.5s;}

}
</style>
