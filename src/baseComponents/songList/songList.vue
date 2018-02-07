<template>
    <div class="songList">
        <ul>
            <li v-for="song of songsList" class="item">
                <div class="content">
                    <h2 class="name">{{ song.name }}</h2>
                    <p class="desc">{{ getDesc(song) }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            songsList: {
                type: Array,
                default: () => []
            }
        },
        computed: {

        },
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            getDesc(song) {
                return `${song.singer}.${song.album}`
            }
        },
        components: {

        }
    }
</script>
<style scoped lang="less">
    @import '../../common/less/index.less';
    @import '../../common/less/mixin.less';
    .songList {
        .item {
            .changeFlex(center, flex-start);
            height: 64px;
            border-bottom: 1px solid @white;
            .content {
                overflow: hidden;
                line-height: 20px;
                flex: 1;
                margin: 10px 30px;
                .name {
                    .noWrap;
                    font-size: 14px;
                }
                .desc {
                    .noWrap;
                    font-size: 12px;
                    margin-top: 5px;
                    color: @text-desc;
                }
            }
        }
    }
</style>
