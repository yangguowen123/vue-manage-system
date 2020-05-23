import request from '@/utils/request';

window.GLOBAL = {
	systemSetting : {
		currencyUnit : ''
	}
};

window.browserRedirect = function browserRedirect() {
　　var sUserAgent = navigator.userAgent.toLowerCase();
　　var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
　　var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
　　var bIsMidp = sUserAgent.match(/midp/i) == "midp";
　　var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
　　var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
　　var bIsAndroid = sUserAgent.match(/android/i) == "android";
　　var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
　　var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
　　if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
    　　window.location.href="http://baidu.com";
　　}　　　
}
// browserRedirect();

window.initGlobal = function initGlobal() {
	var systemSetting = sessionStorage.getItem('systemSetting');
	if (systemSetting != null) {
		window.GLOBAL.systemSetting = JSON.parse(systemSetting);
	} else {
		loadSystemSetting();
	}
}

window.loadSystemSetting = function loadSystemSetting() {
	var that = this;
	request.get('/masterControl/getSystemSetting').then(function(res) {
		window.GLOBAL.systemSetting = res.data;
		sessionStorage.setItem('systemSetting', JSON.stringify(window.GLOBAL.systemSetting));
	});
}

/**
 * 由于js存在精度丢失的问题,需要对其进行四舍五入处理
 * 
 * @param num
 * @param digit
 *            小数位数, 不填则默认4为小数
 * @returns
 */
window.numberFormat = function numberFormat(num, digit) {
	if (digit == null) {
		digit = 4;
	}
	return parseFloat(Number(num).toFixed(digit));
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
window.getQueryString = function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

window.initGlobal();
