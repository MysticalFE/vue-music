/**
 * dom添加class
 * @param  {string} el        [dom]
 * @param  {string} className [class名称]
 */
export const addClass = (el,className) => {
	if (hasClass(el,className)) {
		return
	}
	el.className = ' ' + className
	// let newClass = className.split(' ')
	// newClass.push(newClass)
	// el.className = newClass.join(' ')
}
/**
 * 判断dom是否存在该class
 */
export const hasClass = (el,className) => {
	return new RegExp('(^| )' + className + '( |$)').test(el.className); //正则判断
}

/**
 * 为dom设置或添加自定义属性data-
 */
export const getDomData = (el,name,val) => {
	const prefix = 'data-'
	name = prefix + name
	if (val) {
		return el.setAttribute(name,val)
	} else {
		return el.getAttribute(name)
	}
}
/*
*判断浏览器并给dom添加transform前缀
 */
let elementStyle = document.createElement('div').style
let testBrowser = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		moz: 'MozTransform',
		o: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}
	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] != undefined) {
			return key
		}
	}
	return false
})()
export const prefixStyle = style => {
	if (testBrowser == false) {
		return false
	}
	if (testBrowser == 'standard') {
		return style
	}
	return testBrowser + style.charAt(0).toUpperCase() + style.substr(1)
}
