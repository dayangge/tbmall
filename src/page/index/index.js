/**
 * Created by Administrator on 2017-11-20.
 */
require('../common/index');
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/header/index.js');
require('../common/nav-side/index.js');
var _mm = require('util/mm.js');














_mm.request({
    url:'/product/list.do?keyword=1',
    success:function (res) {
        console.log(res)
    },
    error:function (errMsg) {
        console.log(errMsg)
    }
});

