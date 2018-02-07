<template>
<scroll class="listview pr" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
  <ul>
    <li v-for="item of data" class="itemGroup" ref="itemGroup">
      <h2 class="itemGroupTitle">{{ item.title }}</h2>
      <ul>
        <li v-for="itemDetail of item.itemList" @click="selectItem(itemDetail)" class="item">
          <img v-lazy="itemDetail.headshot" />
          <span>{{ itemDetail.name }}</span>
        </li>
      </ul>
    </li>
  </ul>
  <div class="listShortCut pa" @touchstart="shortCutTouchStart" @touchmove="shortCutTouchMove">
    <ul>
      <li v-for="(item,index) of shortCutList" :data-index="index" class="pr" :class="{current: currentIndex === index}" ref="shortCut">
        {{ item }}
        <!-- <div class="magnifier pa" v-if="showFlag">
						{{ currentItem }}
					</div> -->
      </li>
    </ul>
  </div>
  <div class="fixedTitle pa" v-show="fixedTitle" ref="fixedTitle">
    <h2>{{ fixedTitle }}</h2>
  </div>
</scroll>
</template>
<script type="text/javascript">
import Scroll from '../scroll/scroll';
import {
  getDomData
} from '../../common/js/dom.js'
export default {
  data() {
    return {
      navCurrentIndex: '',
      currentItem: '',
      touch: {},
      listenScroll: true,
      scrollY: -1,
      currentIndex: 0,
      // probeType: 3,
      listHeight: [],
      diff: -1,
      showFlag: false
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  created() {
    this.probeType = 3 //滑动过程中实时监听scroll事件
  },
  methods: {
    //触摸开始
    shortCutTouchStart(e) {
      // console.log(e)
      //touchstart时的y轴偏移量
      this.touch = {
        pageY1: e.touches[0].pageY,
        index: this.navCurrentIndex
      }
      //获取右侧当前点击的index
      this.navCurrentIndex = getDomData(e.target, 'index')
      this.scrollToTarget(this.navCurrentIndex)
    },
    //触摸移动
    shortCutTouchMove(e) {
      //touchmove时的y轴偏移量
      this.touch.pageY2 = e.touches[0].pageY
      let rangeDiff = this.touch.pageY2 - this.touch.pageY1
      // touchmove获取到当前歌手列表的index,18为侧边栏li的高度
      let moveTargetIndex = Math.floor(rangeDiff / 18) + parseInt(this.navCurrentIndex)
      // console.log(rangeDiff)
      this.scrollToTarget(moveTargetIndex)

    },
    scroll(pos) {
      // console.log(pos)
      this.scrollY = pos.y
    },
    //滚动到相应的位置
    scrollToTarget(index) {
      // console.log(index)
      //对侧边滑动到顶部和底部index进行处理
      if (index < 0) index = 0;
      if (index > this.listHeight.length - 2) index = this.listHeight.length - 2;
      console.log(index)
      this.$refs.listview.scrollToElement(this.$refs.itemGroup[index], 300)
    },
    //计算滚动的高度
    calculateHeight() {
      const list = this.$refs.itemGroup
      let height = 0
      this.listHeight.push(height) //保证list的第一个元素为0
      list.forEach((item, index) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    },
    //将当前点击的歌手信息派发到singerDetail页面
    selectItem(itemDetail) {
      this.$emit("select", itemDetail)
    }
  },
  computed: {
    //右侧导航列表数组
    shortCutList() {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  watch: {
    //监听list列表dom成功渲染后，计算高度
    data() {
      this.$nextTick(() => {
        this.calculateHeight()
      })
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      //当滚动到顶部
      if (newY >= 0) {
        this.currentIndex = 0
        return
      }
      // console.log(listHeight)
      // 当滚动到中间部分
      for (let i = 0; i < listHeight.length - 1; i++) {
        let heigherLimit = listHeight[i] //单个歌手组的上限高度
        let lowerLimit = listHeight[i + 1] //下限高度
        if (-newY >= heigherLimit && -newY < lowerLimit) {
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.diff = lowerLimit + newY
          // console.log(newY)
          // console.log(this.diff)
          return
        }
      }
      //当滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      //30表示top的高度,newVal - 30表示上一个item header的偏移量
      let fixedTop = (this.diff > 0 && this.diff < 30) ? newVal - 30 : 0
      //此处判断的操作目的：当上面条件this.diff > 0 && this.diff < 30在初始时就已满足的话，不用进行下面dom的操作，用以减少dom操作，提升性能优化。
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop
      this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  filters: {
    filterSameEl() {
      // console.log(this.$refs.shortCut)
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index';
@import '../../common/less/mixin';
.listview {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @list-view-item-bg;
    ul {
        li {
            padding-bottom: 30px;
            h2 {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: 14px;
                color: @list-view-title;
                background: @header-background;
            }
            ul {
                li {
                    .changeFlex(center,flex-start);
                    padding: 20px 0 0 30px;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    span {
                        margin-left: 20px;
                        color: @nav-text-color;
                    }
                }
            }
        }
    }
    .listShortCut {
        right: 0;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: @header-background;
        li {
            padding: 3px;
            line-height: 1;
            color: @list-view-title;
            font-size: 12px;
            &.current {
                color: @nav-text-color;
                font-weight: 700;
            }
        }
    }
    .fixedTitle {
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        padding-left: 20px;
        background: @header-background;
        h2 {
            line-height: 30px;
            font-size: 14px;
            color: @list-view-title;
        }
    }
}
</style>
