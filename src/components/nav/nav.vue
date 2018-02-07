<template>
	<nav>
		<router-link class="nav-item" to="/recommend">推荐</router-link>
		<router-link class="nav-item" to="/singer">歌手</router-link>
		<router-link class="nav-item" to="/rank">排行榜</router-link>
		<router-link class="nav-item" to="/search">搜索</router-link>
	</nav>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {

			}
		}

	}
</script>
<style lang="less" scoped>
	@import '../../common/less/index.less';
	@import '../../common/less/mixin.less';
	nav {
		height: 46px;
		background: @white;
		.changeFlex (center,center);
		.nav-item {
			color: @nav-text-color;
			font-size: 16px;
			text-align: center;
			line-height: 40px;
			flex: 1;
		}
		a.router-link-active {
			color: @header-background;
			border-bottom: 1px solid @header-background;
		}
	}
</style>