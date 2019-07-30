const canadianDollar = 0.91;

function roundTwo(amount) {
	return Math.round(amount * 100) / 100;
}
// exports是module.exports的引用, 直接给exports赋值引用就断开了, 是错误的
exports.canadianToUS = canadian => roundTwo(canadian * canadianDollar);
exports.USToCanadian = us => roundTwo(us / canadianDollar);
