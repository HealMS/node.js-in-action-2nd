//引入目录时，node会引入目录下package.json文件中main字段对应的文件，不想引入index可以自行设置
const currency = require("./my_module");
console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(currency.canadianToUS(50));
console.log("30 US dollars equals this amount of Canadian dollars:")
console.log(currency.USToCanadian(30));