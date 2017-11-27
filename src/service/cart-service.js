/**
 * Created by Administrator on 2017-11-25.
 */
var _mm = require('util/mm.js');
var _cart = {
    getCartCount:function (resolve,reject) {
        //检查购物车数量
        _mm.request({
            url:_mm.getServerUrl('./cart/get_cart_product_count.do'),
            success:resolve,
            error:reject
        })
    }
};
module.exports = _cart;