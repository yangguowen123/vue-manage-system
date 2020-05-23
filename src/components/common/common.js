import request from '@/utils/request';

window.GLOBAL = {
	systemSetting : {
		currencyUnit : ''
	}
};
initGlobal();

function initGlobal() {
	var systemSetting = sessionStorage.getItem('systemSetting');
	if (systemSetting != null) {
		window.GLOBAL.systemSetting = JSON.parse(systemSetting);
	} else {
		loadSystemSetting();
	}
}

function loadSystemSetting() {
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
function numberFormat(num, digit) {
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
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
