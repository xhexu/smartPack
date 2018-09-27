<template>
  <div style="position: relative;width: 100%;height: 50%">
    <div>
      <el-dialog :title="htmlTitle" :visible.sync="dialogFormVisible">
      <div style="max-width: 100%" v-html="htmlContent"></div>
      </el-dialog>
    </div>
    <div class="card" :style="{backgroundImage: 'url(' + cardBgUrl + ')'}">
      <div class="card-title" :class="titleClass">{{title}}</div>
        <div  class="card-div nwwest-roll" style="overflow:hidden;clear:both;width: 90%;height: 80%"  :class="cardDivClass"  id="nwwest-roll">
          <ul id="roll-ul" >
            <li @mouseover="stopScroll" @mouseout="beginScroll" ref="rollul" v-for="item in info" style="width: 100%;padding-top: 5px" @click="handleClick(item)" :class="{anim:animate==true}">
              <el-row :gutter="8">
                <el-col :title=item.title :span="16" style="font-size: 14px" align="left">
                 {{ item.title.substr(0,7) }}...
                </el-col>
                <el-col :span="8" style="font-size: 12px"  align="center">{{ getFormtTime(item.checkTime) }}</el-col>
              </el-row>
            </li>
          </ul>
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
    }
  },
  data () {
    return {
      animate: true,
      showItemDiv: false,
      cardDivClass: '',
      itemClass: '',
      titleClass: '',
      chartClass: '',
      cardBgUrl: '',
      title: '-----',
      dialogFormVisible: false,
      htmlContent: '',
      htmlTitle: '',
      canScroll: true
    }
  },
  mounted () {
    this.dealChartOption()
    this.dealCardOption()
    setInterval(this.scroll, 2000)
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
    scroll(){
      let con1 = this.$refs.rollul
      if(con1==null || con1.length==0 || !this.canScroll){
        return
      }
      con1[0].style.marginTop='30px';
      this.animate=!this.animate
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function(){
        that.info.push(that.info[0]);
        that.info.shift();
        con1[0].style.marginTop='0px';
        that.animate=!that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      },0)
    },
    stopScroll(){
      this.canScroll=false
    },
    beginScroll(){
      this.canScroll=true
      // setInterval(this.scroll, 2000)
    }

  }

}

</script>

<style lang="scss" scoped>
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
