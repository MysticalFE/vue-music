import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = r => require.ensure([], () => r(require('../components/recommend/recommend.vue')), 'recommend')
const Singer = r => require.ensure([], () => r(require('../components/singer/singer.vue')), 'singer')
const SingerDetail = r => require.ensure([], () => r(require('../components/singerDetail/singerDetail.vue')), 'singerDetail')
const Rank = r => require.ensure([], () => r(require('../components/rank/rank.vue')), 'rank')
const Search = r => require.ensure([], () => r(require('../components/search/search.vue')), 'search')
const User = r => require.ensure([], () => r(require('../components/user/user.vue')), 'user')
export default new Router({
    routes: [
      //重定向推荐页
      {
        	path: '/',
        	redirect: '/recommend'
      },
      //推荐
      {
      	path: '/recommend',
      	component: Recommend
      },
      //歌手
      {
        path: '/singer',
        component: Singer,
        children: [
          {
            path: ':id',
            component: SingerDetail
          }
        ]
      },
      //排行榜
      {
        path: '/rank',
        component: Rank
      },
      //搜索
      {
        path: '/search',
        component: Search
      },
      //用户中心
      {
        path: '/user',
        component: User
      }
    ]
})
