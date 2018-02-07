//qq音乐api的公共参数
export const commonParams = {
	g_tk: 5381,
	inCharset: 'utf_8',
	outCharset: 'utf_8',
	notice: 0,
	format: 'jsonp'
}

//jsonp中options参数中param命名为jsonpCallback => defaults to callback 
export const opts = {
	param: 'jsonpCallback'
}