import oriJSONP from 'jsonp'

//用Promise重新封装jsonp的fn回调函数
export const jsonp = (url, data, opts) => {
	url += ((url.indexOf('?')) < 0 ? '?' : '&') + dealParams(data)//对url进行完整的拼接
	return new Promise((resolve, reject) => {
		oriJSONP(url, opts, (err, data) => {
			if (!err) {
				resolve(data)
			} else {
				reject(err)
			}
		})
	});
}

//对url参数data进行处理
function dealParams(data) {
	let urlParams = '';
	for (let key in data){
		let value = data[key] != undefined ? data[key] : '';
		urlParams +=  '&' + key + '=' + encodeURIComponent(value);//对value进行转义
	}
	// return urlParams;
	return urlParams ? urlParams.substring(1) : ''//为避免jsonp中url拼接时已带有参数，此处'&'进行了判断处理
}