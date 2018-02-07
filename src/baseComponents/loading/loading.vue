<template>
    <div id="loading" v-show="showLoading">
    	<transition name="loading">
			<div class="loadingContainer">
				<img src="../../common/images/loading.svg" height="32" width="32" alt="">
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},
		props:['showLoading']
	}
</script>
<style lang="less" scpoed>
	@import '../../common/less/mixin';
	.loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .loadingContainer{
    	position:fixed;
    	top:50%;
		left:50%;
		transform: translate3d(-50%,-50%,0);
		z-index: 900;
		// background:rgba(0,0,0,.5);
		.changeFlex(center,center)
    }
</style>