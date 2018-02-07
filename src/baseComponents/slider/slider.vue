<template>
	<div class="slider" ref="slider">
		<div class="sliderList pr" ref="sliderList">
			<slot></slot>
		</div>
		<div class="paginations pa">
			<span class="pagination" v-for="(item,index) of paginations" :class="{active: currentIndex === index}" @click="changeImgIndex"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BetterScroll from 'better-scroll'
	import { addClass } from '../../common/js/dom'
	export default {
		data () {
			return {
				paginations: [],
				currentIndex: 0
			}
		},
		props: {
			//是否循环轮播
			loop: {
				type: Boolean,
				default: true
			},
			//是否自动轮播
			autoPlay: {
				type: Boolean,
				default: true
			},
			//轮播间隔
			interval: {
				type: Number,
				default: 2000
			}
		},
		created () {

		},
		mounted () {
			//保证在recommend中dom渲染完后执行
			this.$nextTick(() => {
				this.setSliderListWidth()
				this.initPagination()
				this.initSlider()
				if (this.autoPlay) {
					this.autoSlider()
				}
			})
			this.changeResize()
		},
		//组件销毁时，清除定时器
		destoryed () {
			clearTimeout(this.timer)
		},
		methods: {
			//设置轮播容器的总宽度
			setSliderListWidth(isResize) {
				this.children = this.$refs.sliderList.children//[轮播item]
				// console.log(this.$refs.sliderList)
				// console.log(this.children)
				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth//轮播父容器的宽度
				for (let i = 0;i < this.children.length;i++){
					let item = this.children[i]
					addClass(item, 'sliderItem')
					item.style.width = sliderWidth + 'px'
					width += sliderWidth
				}
				if (this.loop && !isResize) {
					width += 2*sliderWidth //如果为true循环轮播，会将当前轮播item复制一遍
				}
				this.$refs.sliderList.style.width = width + 'px'//轮播父容器的总宽度
			},
			//dot index
			initPagination() {
				this.paginations = new Array(this.children.length)
				// console.log(this.paginations)
			},
			//初始化slider
			initSlider() {
				//better-scroll相关配置
				this.slider = new BetterScroll(this.$refs.slider, {
					scrollX: true, //x轴滑动
					scrollY: false,//
					momentum: false,//快速滑动时没有滑动惯性
					snap: true,//
					snapLoop: this.loop,//是否无缝循环
					snapThreshold: 0.3,//手指滑动时页面可切换的阈值即大于该临界值，轮播到下一张图
					snapSpeed: 400//切换的动画时间
			    })
			    this.slider.on('scrollEnd',() => {
			    	let pageIndex = this.slider.getCurrentPage().pageX //better-scroll event事件
			        if (this.loop) {
			        	pageIndex -= 1
			        }
			        // console.log(pageIndex)
          			this.currentIndex = pageIndex
          			if (this.autoPlay) {
				    	clearTimeout(this.timer)
				    	this.autoSlider()
				    }
			    })
			},
			//自动滚动
			autoSlider() {
				let imgIndex = this.currentIndex + 1;
				if (this.loop) {
					imgIndex += 1;
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(imgIndex,0,400)
				},this.interval)
			},
			//改变视窗宽度
			changeResize () {
				window.addEventListener('resize',() => {
					 //判断slider是否初始化
					if (!this.slider) {
						return;
					}
					this.setSliderListWidth(true);
					this.slider.refresh();
				})
			},
			changeImgIndex () {
				let currentImgIndex = this.currentIndex
				if (this.loop) {
					currentImgIndex += 1
				}
				this.slider.goToPage(currentImgIndex,0,this.interval)
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../common/less/index.less';
	@import '../../common/less/mixin.less';
	.slider {
		min-height: 1px;
		.sliderList {
			overflow: hidden;
			.changeFlex(center,center);
			flex-wrap: nowrap;
			.sliderItem {
				box-sizing: border-box;
				text-align: center;
				overflow: hidden;
				a{
					display: block;
					width: 100%;
					overflow: hidden;
					img {
						display: block;
						width: 100%;
					}
				}
			}
		}
		.paginations {
			left: 0;
			right: 0;
			bottom: 6px;
			text-align: center;
			.pagination {
				display: inline-block;
		        margin: 0 4px;
		        width: 6px;
		        height: 6px;
		        border-radius: 50%;
		        background:@dot-bg-color;
			}
			.active {
				background:@white;
			}
		}
	}
</style>
