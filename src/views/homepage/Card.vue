<template>
	<div class="card" :style="{backgroundImage: 'url(' + cardBgUrl + ')',height:jsHeight+'px'}">
		<div class="card-div" :class="cardDivClass" v-show="showItemDiv">
			<ul>
				<li v-for="item in itemList" @click="chooseItem(item)">
					{{item.title}}
			    </li>
			</ul>
		</div>
		<div class="card-item" :class="itemClass" v-on:click="clickitem">{{item.title}}</div>
		<div class="card-title" :class="titleClass">{{title}}</div>
		<div class="card-chart" :class="chartClass">
			<bar-chart :option="chartOption"></bar-chart>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.card{
		position: relative;
        background-repeat: no-repeat;
        background-size:100% 100%;
        height: auto;
        width: 70%;
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
		    	font-size: 14px;
		    } 
		    li:hover{
		    	color: #EB850C;
		    }
        }
        &-div-tl{
		    left: 1%;
		    top: 20%;
        }
        &-div-tr{
		    right: 1%;
		    top: 20%;
        }
        &-div-bl{
		    left: 1%;
		    bottom: 20%;
        }
        &-div-br{
		    right: 1%;
		    bottom: 20%;
        }
        &-item:hover{
        	color: #EB850C;
        }
        &-title{
        	position: absolute;
        	color: #01A4AE;
        }
        &-chart{
        	width: 80%;
        	height: 90%;
        	position: absolute;
        }
        &-item-tl{
        	left:9%;
        	top: 10% !important;
        }
        &-title-tl{
        	left: 30%;
        	top: 7% !important;
        }
        &-chart-tl{
        	left: 50px;
			top: 40px;
        }
        &-item-tr{
        	right: 9%;
        	top: 10% !important;
        }
        &-title-tr{
        	right: 30%;
        	top: 7% !important;
        }
        &-chart-tr{
        	right: 20px;
			top: 40px;
        }
        &-item-bl{
        	left:9%;
        	bottom: 10% !important;
        }
        &-title-bl{
        	left: 30%;
        	bottom: 7% !important;
        }
        &-chart-bl{
        	left: 50px;
			top: -20px;
        }
        &-item-br{
        	right:9%;
        	bottom: 10% !important;
        }
        &-title-br{
        	right: 30%;
        	bottom: 7% !important;
        }
        &-chart-br{
        	right: 20px;
			top: -20px;
        }
	}
</style>
<script>
	import _ from 'underscore'
	import BarChart from './charts/BarChart.vue'
	export default {
		name: 'card',
		components: {
		    BarChart
		},
		props: {
		    option: {
		      type: Object,
		      default () {
		        return {}
		      }
		    },
		    chart: {
		    	type: Object
		    }
		},
		watch: {
			chart: {  
		　　　　handler(newValue, oldValue) {  
		　　　　　　this.chartOption = newValue
		　　　　},  
		　　　　deep: true  
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
				title: '-----',
				item: {
					title: '本周'
				},
				chartOption: {},
				jsHeight:(document.body.clientHeight-100)/2,
				itemList:[{
					title:'本周',
					type:'d',
					time:''
				},{
					title:'本月',
					type:'m',
					time: this.getTime()
				},{
					title:'本年',
					type:'y',
					time: new Date().getFullYear()
				}]
			}
		},
		mounted () {
			this.dealChartOption()
			this.dealCardOption()
			window.onresize = function(){
				this.jsHeight = (document.body.clientHeight-100)/2
			}
		},
		methods: {
			getTime () {
				let m = (new Date().getMonth()+1)>10?(new Date().getMonth()+1):'0'+(new Date().getMonth()+1)
				return new Date().getFullYear()+'-'+m
			},
			clickitem () {
				this.showItemDiv = !this.showItemDiv
			},
			chooseItem (item) {
				this.showItemDiv = false
				this.item.title = item.title
				item.cardId = this.option.position
				this.$emit('chooseQuery',item);
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
						  this.cardBgUrl = '/static/divTL.png'
						  this.itemClass = 'card-item-tl'
						  this.titleClass = 'card-title-tl'
						  this.chartClass = 'card-chart-tl'
						  this.cardDivClass = 'card-div-tl'
						  break;
						case 'TR':
						  this.cardBgUrl = '/static/divTR.png'
						  this.itemClass = 'card-item-tr'
						  this.titleClass = 'card-title-tr'
						  this.chartClass = 'card-chart-tr'
						  this.cardDivClass = 'card-div-tr'
						  break;
						case 'BL':
						  this.cardBgUrl = '/static/divBL.png'
						  this.itemClass = 'card-item-bl'
						  this.titleClass = 'card-title-bl'
						  this.chartClass = 'card-chart-bl'
						  this.cardDivClass = 'card-div-bl'
						  break;
						case 'BR':
						  this.cardBgUrl = '/static/divBR.png'
						  this.itemClass = 'card-item-br'
						  this.titleClass = 'card-title-br'
						  this.chartClass = 'card-chart-br'
						  this.cardDivClass = 'card-div-br'
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