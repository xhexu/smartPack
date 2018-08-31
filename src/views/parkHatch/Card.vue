<template>
<div class="card" :style="{height: `${cardH}px`,backgroundImage: 'url(' + cardBgUrl + ')'}">
  <div class="card-title" :class="titleClass">{{title}}</div>
  <div class="card-div" :class="cardDivClass" >
    <ul>
      <li v-for="item in info">
        {{item.title}}
        </li>
    </ul>
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
    clientHeight: {
      type: Number,
      default () {
        return document.documentElement.clientHeight || document.body.clientHeight
      }
    }
  },
  data () {
    return {
      showItemDiv: false,
      cardDivClass: '',
      itemClass: '',
      titleClass: '',
      chartClass: '',
      cardBgUrl: '',
      title: '-----'
    }
  },
  mounted () {
    this.dealChartOption()
    this.dealCardOption()
  },
  computed: {
    cardH: function () {
      var hx = this.clientHeight * 0.35
      console.info('heithgt');
      return hx;
    }
  },
  methods: {
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
    }
  }

}

</script>

<style lang="scss" scoped>
.card{
  position: relative;
      background-repeat: no-repeat;
      background-size:100% 100%;
      max-width: 260px;
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
}
</style>
