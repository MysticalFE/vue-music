<template>
	<div class="singerWraper">
		<list-view @select="selectSinger" :data="singerList"></list-view>
		<router-view></router-view>
		<loading :showLoading="showLoading"></loading>
	</div>
</template>
<script type="text/javascript">
	import {getSingerList} from "../../api/singer"
	import SingerProp from "../../common/js/singer"
	import Loading from "../../baseComponents/loading/loading"
	import ListView from "../../baseComponents/singerlistview/singerListview"
	import { mapMutations } from 'vuex'
	export default {
		data () {
			return {
				singerList: [],
				showLoading: true
			}
		},
		created () {
			this.getSingerData()
		},
		methods: {
			...mapMutations({
				setSinger: 'SINGER'
			}),
			selectSinger(singer) {
				// console.log(singer)
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			//歌手列表数据
			getSingerData () {
				getSingerList().then((res) => {
					// console.log(res)
					if (res.code == 0) {
						this.singerList = res.data.list
						this.dealSingerList()
						this.showLoading = false
					}
				}).catch((error) => {

				})
			},
			//对数据结构进行处理，得到符合我们需求的结构
			dealSingerList () {
				const HOT_TITLE = '热门';
				const HOT_LIST_LENGTH = 10;
				let newSingerList = {
					hot: {
						title: HOT_TITLE,
						itemList: []
					}
				}
				this.singerList.forEach((item,index) => {
					//取前10条数据作为热门数据
					if (index < HOT_LIST_LENGTH) {
						newSingerList.hot.itemList.push(new SingerProp({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}
					//以字母为序，进行数据处理
					const letterKey =item.Findex
					if (!newSingerList[letterKey]) {
						newSingerList[letterKey] = {
							title: letterKey,
							itemList: []
						}
					}
					newSingerList[letterKey].itemList.push(new SingerProp({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
				})
				// console.log(newSingerList)
				//对得到的newSingerList进行有序排列
				let hot = [],letterList = []
				for (let key in newSingerList) {
					let val = newSingerList[key]
					if (val.title.match(/[a-zA-Z]/)) {//匹配a-z
						letterList.push(val)
					} else if (val.title == HOT_TITLE) {
						hot.push(val)
					}
				}
				//对a-z列表进行排序
				letterList.sort((a,b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				// console.log(hot.concat(letterList))
				this.singerList = hot.concat(letterList)
				return this.singerList
			}
		},
		components: {
			ListView,
			Loading
		}
	}
</script>
<style lang="less" scoped>
	.singerWraper {
		position: fixed;
	    top: 88px;
	    bottom: 0;
	    width: 100%;
	}
</style>
