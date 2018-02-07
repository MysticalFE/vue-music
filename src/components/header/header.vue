<template>
	<div class="v-header">
		<div class="logo">
			<div class="logoImg"></div>
			<span>Jack Music</span>
		</div>
		<router-link tag="div" class="mine" to="/user">
      		<span class="icon-mine"></span>
      	</router-link>
	</div>
</template>
<script type="text/javascript">
	export default {

	}
</script>
<style lang="less" scoped>
	@import '../../common/less/index.less';
	@import '../../common/less/mixin.less';
	.v-header {
		height: 44px;
		padding: 9px 10px;
		background: @header-background;
		.changeFlex(center,space-between);
		.logo {
			width: 120px;
			.changeFlex(center,space-between);
			.logoImg {
				width: 25px;
				height: 25px;
				border-radius: 50%;
				.bg ('../../common/images/logo.jpg');
			}
		}
		.mine {
			.icon-mine {
				display: block;
				font-size: 25px;
			}
		}
	}
</style>