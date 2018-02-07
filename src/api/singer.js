import {jsonp} from "../common/js/jsonp";
import { commonParams,opts } from "./configParam"

export const getSingerList = () => {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		g_tk:738663297,
		hostUin:0,
		platform:'yqq',
		needNewCode:0
	})

	return jsonp(url,data,opts)
}

export const getSingerDetail = (singerid) => {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	const data = Object.assign({}, commonParams, {
		singermid: singerid,
		notice: 0,
		platform: 'h5page',
		needNewCode: 1,
		order: 'listen',
		from: 'h5',
		num: 100,
		begin: 0,
		g_tk:933735675
	})

	return jsonp(url, data, opts)
}
