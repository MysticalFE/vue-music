<template>
    <div class="musicList pf">
        <div class="back pa">
            <i class="icon-back" @click="goBack"></i>
        </div>
        <h1 class="title pa" v-html="title"></h1>
        <div class="bgImage pr" :style="bgStyle" ref="bgImage">
            <div class="playWrapper pa">
                <div ref="playBtn" v-show="songsList.length>0" class="play">
                    <i class="icon-play"></i>
                    <span class="text">播放全部</span>
                </div>
            </div>
            <div class="filter pa"></div>
        </div>
        <div class="bgLayer pr" ref="bgLayer"></div>
        <scroll :data="songsList" class="list pf" ref="songList" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
            <div class="songListWrap">
                <song-list :songsList="songsList"></song-list>
            </div>
            <loading :showLoading="showLoading"></loading>
        </scroll>
    </div>
</template>
<script type="text/ecmascript-6">
    import Scroll from '../../baseComponents/scroll/scroll'
    import SongList from '../../baseComponents/songList/songList'
    import { prefixStyle } from '../../common/js/dom'
    import Loading from '../../baseComponents/loading/loading'
    const HEADER_TITLE = 40
    const transform = prefixStyle('transform') //js添加transform前缀
    export default {
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songsList: {
                type: Array,
                default: () => []
            },
            title: {
                type: String,
                default: ''
            },
            showLoading: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`
            }
        },
        data() {
            return {
                scrollY: 0
            }
        },
        created() {
            this.probeType = 3
            this.listenScroll = true
        },
        mounted() {
            // console.log(this.$refs.songList.$el)
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.minTranslateY = -(this.imageHeight - HEADER_TITLE)
            // console.log(this.imageHeight);
            this.$refs.songList.$el.style.top = `${this.imageHeight}px`
        },
        methods: {
            goBack() {
                this.$router.go(-1)//后退
                // this.$router.back()// 后退 + 刷新
            },
            //获取歌曲列表滚动的高度
            scroll(pos) {
                this.scrollY = pos.y
            }
        },
        watch: {
            scrollY(newY) {
                let translateY = Math.max(this.minTranslateY, newY)
                // console.log(translateY)
                let zIndex = 0
                let scale = 1
                //处理滚动bgLayer层
                // this.$refs.bgLayer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`
                // this.$refs.bgLayer.style['transform'] = `translate3d(0,${translateY}px,0)`
                this.$refs.bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`
                //处理滚动到顶部边界，对歌手图进行处理
                if (newY < this.minTranslateY) {
                    zIndex = 30
                    this.$refs.bgImage.style.paddingTop = `0%`
                    this.$refs.bgImage.style.height = `40px`
                    this.$refs.playBtn.style.display = 'none'
                } else {
                    this.$refs.bgImage.style.paddingTop = `70%`
                    this.$refs.bgImage.style.height = `0`
                    this.$refs.playBtn.style.display = 'block'
                }
                //处理列表下拉时歌手头像放大
                if (newY > 0) {
                    scale = 1 + Math.abs(newY / this.imageHeight)
                    zIndex = 30
                    // console.log(scale)
                }
                this.$refs.bgImage.style.zIndex = zIndex
                // this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
                // this.$refs.bgImage.style['transform'] = `scale(${scale})`
                this.$refs.bgImage.style[transform] = `scale(${scale})`
            }
        },
        components: {
            Scroll,
            SongList,
            Loading
        }
    }
</script>
<style scoped lang="less">
    @import '../../common/less/index';
    @import '../../common/less/mixin';
    .musicList {
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 100;
        background: @body-background;
        .back {
            top: 0;
            left: 6px;
            z-index: 50;
            .icon-back {
                display: block;
                padding: 10px;
                font-size: 22px;
                color: @header-background;
            }
        }
        .title {
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            .noWrap;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
        }
        .bgImage {
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
            .playWrapper {
                bottom: 20px;
                z-index: 50;
                width: 100%;
                .play {
                    box-sizing: border-box;
                    width: 170px;
                    padding: 7px 0;
                    margin: 0 auto;
                    text-align: center;
                    background: @header-background;
                    border: 1px solid @header-background;
                    color: @white;
                    border-radius: 100px;
                }
                .icon-play {
                    color: @white;
                    margin-right: 6px;
                    font-size: 16px;
                }
                .text {
                    color: @white;
                }
            }
            .filter {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: @list-view-title;
            }
        }
        .bgLayer {
            height: 100%;
            background: @body-background;
        }
        .list {
            top: 0;
            bottom: 0;
            width: 100%;
            background: @body-background;
            // overflow: hidden;
            .songListWrap {
                // padding: 20px 30px;
            }
        }
    }
</style>
