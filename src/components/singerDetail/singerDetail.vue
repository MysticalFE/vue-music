<template>
	<transition name="slider">
		<musicList
			class="singerDetail pf"
			:songsList="songsList"
			:title="title"
			:bgImage="bgImage"
			:showLoading="showLoading"
		>
		</musicList>

	</transition>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex'
	import { getSingerDetail } from '../../api/singer'
	import { _localStorage } from '../../common/js/base'
	import { createSong } from '../../common/js/song'
	import MusicList from '../musicList/musicList'
	export default {
		data() {
			return {
				songsList: [],
				showLoading: true
			}
		},
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.headshot
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			console.log(this.singer);
			// _localStorage('singerId', this.singer.id)
			this.getDetail()
		},
		methods: {
			getDetail() {
				if (!this.singer.id) {
		          this.$router.push('/singer')
		          return
		        }
				// const singerID = _localStorage('singerId')
				getSingerDetail(this.singer.id).then(res => {
					if (res.code == 0) {
						this.songsList = this.dealSongsList(res.data)
						this.showLoading = !this.showLoading
					}
				})
			},
			dealSongsList(singerData) {
				let ret = []
				singerData.list.forEach(item => {
					let {musicData} = item
					ret.push(createSong(musicData))
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>
<style lang="less" scoped>
	@import '../../common/less/index.less';
	.slider-enter-active, .slider-leave-active{
		transition: all .5s ease;
	}
	.slider-enter, .slider-leave-active {
		transform: translate3d(100%,0,0);
	}
	.singerDetail {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background: @body-background;
	}
</style>
