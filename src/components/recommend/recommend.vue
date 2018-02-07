<template>
	<div class="recommend pf">
		<section class="recommendCentent">
			<section v-if="sliderList.length" class="sliderWraper pr">
				<slider>
					<div v-for="item of sliderList">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" alt="">
						</a>
					</div>
				</slider>
			</section>
			<section class="radioWraper">
				<h2>电台</h2>
				<ul>
					<li v-for="item of radioList" :data-id="item.radioid">
						<div class="listImg pr">
							<img v-lazy="item.picUrl">
							<span class="pa icon-play"></span>
						</div>
						<div class="listItemInfo">
							<h3>{{ item.Ftitle }}</h3>
						</div>
					</li>
				</ul>
			</section>
			<section class="radioWraper songMenuWraper">
				<h2>热门歌单</h2>
				<ul>
					<li v-for="item of songMenuList" :data-id="item.id">
						<div class="listImg pr">
							<img v-lazy="item.picUrl">
							<span class="listenCount pa">
								<i class="icon-headphones"></i>
								<span>{{ resetListenCount(item) }}</span>
							</span>
							<span class="pa icon-play"></span>
						</div>
						<div class="listItemInfo">
							<h3>{{ item.songListDesc }}</h3>
							<p>{{ item.songListAuthor }}</p>
						</div>
					</li>
				</ul>
			</section>
		</section>
		<loading :showLoading="showLoading"></loading>
	</div>
</template>
<script type="text/javaScript">
	import Slider from "../../baseComponents/slider/slider"
	import Loading from "../../baseComponents/loading/loading"
	import {getRecommendData} from "../../api/recommend"
	export default {
		data () {
			return {
				recommendData: null,//推荐数据
				sliderList: [],
				radioList: [],
				songMenuList: [],
				showLoading: true
			}
		},
		created () {
			this.getData()
		},
		mounted () {

		},
		computed: {

		},
		methods: {
			//获取数据
			getData () {
				getRecommendData().then((res) => {
					if (res.code === 0) {
						this.recommendData = res.data;
						this.sliderList = res.data.slider;
						this.radioList = res.data.radioList;
						this.songMenuList = res.data.songList;
						this.showLoading = !this.showLoading
						console.log(res)
					}
				}).catch(error => {
					console.log(error)
				})
			},
			//对播放量的处理
			resetListenCount(item) {
				let listenCount = item.accessnum
				listenCount = (listenCount/10000).toFixed(1) + '万'
				return listenCount
			}
		},
		components: {
			Slider,
			Loading
		}
	}
</script>
<style lang="less" scoped>
	@import '../../common/less/index';
	@import '../../common/less/mixin';
	.recommend {
		width: 100%;
		top: 88px;
		bottom: 0;
		background: @body-background;
		.recommendCentent {
			height: 100%;
			overflow: auto;
			.sliderWraper {
				overflow: hidden;
				width:100%;
				margin-bottom: 14px;
			}
			.radioWraper {
				margin: 0 10px 7px;
				h2 {
					font-size: 16px;
					margin-bottom: 11px;
					color: @black;
				}
				ul {
					.changeFlex(center,space-between);
					// flex-wrap: wrap;
					margin-right: -8px;
					li {
						width: 50%;
						// padding-right: 8px;
						margin-right: 10px;
						overflow: hidden;
						background: @white;
						.listImg {
							img {
								width: 100%;
							}
							.icon-play {
    							display: block;
    							font-size: 25px;
    							bottom: 5%;
    							right: 4%;
    							color: @header-background;
    						}
						}
						.listItemInfo {
							padding: 0 7px 5px;
    						color: @black;
    						h3 {
    							width: 100%;
    							height: 36px;
    							font-size: 14px;
    							overflow: hidden;
    							text-overflow: ellipsis;
    							white-space: nowrap;
    						}
						}
					}
				}
			}
			.songMenuWraper {
				margin-top: 7px;
				ul {
					flex-wrap: wrap;
					li {
						width: 47.1%;
						margin-bottom: 10px;
						.listImg {
							.listenCount {
								left: 3%;
								bottom: 4%;
								.icon-headphones {
									font-size: 20px;
									color: @white;
								}
								span {
									font-size: 12px;
									color: @white;
								}
							}
						}
						.listItemInfo {
							h3 {
								height: auto;
							}
						}
					}
				}
			}
		}
	}
</style>
