<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,
				default: false
			}
		},
		mounted () {
			setTimeout(() => {
				this.initScroll()
			},20)
		},
		methods: {
			initScroll () {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType: this.probeType,
					click: this.click
				})
				if (this.listenScroll) {
					const _this = this
					this.scroll.on('scroll', pos => {
						_this.$emit('scroll',pos)
					})
				}
			},
			//以下这些方法为better-scroll的内部方法
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			// 获取滚动至相应的位置
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				},20)
			}
		}
	}
</script>
<style lang="less" scoped></style>
