<template>
	<div id="app">
		<v-header></v-header>
		<nav-tab></nav-tab>
	    <keep-alive>
	    	<router-view></router-view>
	    </keep-alive>
	</div>
</template>

<script>
	import VHeader from "./components/header/header";
	import NavTab from "./components/nav/nav";
	export default {
		components: {
			VHeader,
			NavTab
		}
	}
</script>

<style lang="less">
	@import 'common/less/reset.less';
</style>
