<template>
	<div class="card" :style="{backgroundImage: 'url(' + cardBgUrl + ')'}">
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
        height: 300px;
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
		    	font-size: 14px;
		    } 
		    li:hover{
		    	color: #EB850C;
		    }
        }
        &-div-tl{
		    left: -10px;
		    top: 60px;
        }
        &-div-tr{
		    right: -10px;
		    top: 60px;
        }
        &-div-bl{
		    left: -10px;
		    bottom: 60px;
        }
        &-div-br{
		    right: -10px;
		    bottom: 60px;
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
        	left:22px;
        	top: 28px !important;
        }
        &-title-tl{
        	left: 80px;
        	top: 15px !important;
        }
        &-chart-tl{
        	left: 50px;
			top: 40px;
        }
        &-item-tr{
        	right: 22px;
        	top: 28px !important;
        }
        &-title-tr{
        	right: 80px;
        	top: 15px !important;
        }
        &-chart-tr{
        	right: 20px;
			top: 40px;
        }
        &-item-bl{
        	left:22px;
        	bottom: 28px !important;
        }
        &-title-bl{
        	left: 80px;
        	bottom: 15px !important;
        }
        &-chart-bl{
        	left: 50px;
			top: -20px;
        }
        &-item-br{
        	right:22px;
        	bottom: 28px !important;
        }
        &-title-br{
        	right: 80px;
        	bottom: 15px !important;
        }
        &-chart-br{
        	right: 20px;
			top: -20px;
        }
	}
</style>
<script>
	import _ from 'underscore'
	import BarChart from '../../components/charts/BarChart.vue'
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
				itemList:[{
					title:'本周',
					value:'week'
				},{
					title:'本月',
					value:'month'
				},{
					title:'本年',
					value:'year'
				}]
			}
		},
		mounted () {
			this.dealChartOption()
			this.dealCardOption()
		},
		methods: {
			clickitem () {
				this.showItemDiv = !this.showItemDiv
			},
			chooseItem (item) {
				this.showItemDiv = false
				this.item.title = item.title
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
			},
			//查询车辆信息
			sendHttpForCar (querParams) {
				this.$http.post('/user', querParams)
				.then(function (response) {
			    	
			  	}).catch(function (error) {
			    	
			  	})
			},
			//查询租金信息
			sendHttpForRent (querParams) {
				this.$http.post('/user', querParams)
				.then(function (response) {
			    	
			  	}).catch(function (error) {
			    	
			  	})
			},//查询物业费
			sendHttpForFee (querParams) {
				this.$http.post('/user', querParams)
				.then(function (response) {
			    	
			  	}).catch(function (error) {
			    	
			  	})
			},//查询出租率
			sendHttpForRate (querParams) {
				this.$http.post('/user', querParams)
				.then(function (response) {
			    	
			  	}).catch(function (error) {
			    	
			  	})
			}
		}

	}
	
</script>