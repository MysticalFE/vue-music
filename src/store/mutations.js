import * as types from './mutations-types'
import { _localStorage } from '../common/js/base'

const matutations = {
    [types.SINGER](state, singer) {
        state.singer = singer
        // _localStorage('singerId', state.singer.id)//为避免歌手详情页刷新时无数据
    }
}

export default matutations
