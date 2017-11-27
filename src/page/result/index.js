
/**
 * Created by Administrator on 2017-11-27.
 */
require('../common/index');
require('../common/nav/index.js');
require('../common/header/index.js');
require('./index.css');
var _mm = require('util/mm.js');
$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.'+type + '-success').show();
    //显示对应的提示元素
    $element.show()
})