/**
 * Created by Administrator on 2017-11-21.
 */
var conf = {
    serverHost:''
};
var Hogan = require('hogan');
var _mm = {
    //网络请求
    request:function (param) {
        var _this= this;
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success:function (res) {
                if(0===res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error:function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    //获取服务器地址
    getServerUrl:function (path) {
        return conf.serverHost + path
    },
    //获取url参数
    getUrlParam:function (name) {
      //happymmall.com/product/list?keyword=xxx&page=1
        var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    },
    //渲染html模版
    renderHtml:function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
        return result
    },
    //成功提示
    successTips : function (msg) {
      alert(msg || '操作成功')
    },
    errorTips : function (msg) {
      alert(msg || '哪里不对了')
    },
    //表单验证,支持是否为空，手机邮箱
    valiate:function (val,type) {
        var val = $.trim(val);
        //非空验证
        if('require' === type){
            return !! val
        }
        if('phone'===type){
            return /^1\d{10}$/.test(val);
        }
        if('email'===type){
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
        }
    },
    //统一登录
    doLogin:function () {
        window.location.href = './user-login.html?redirect'+ encodeURIComponent(window.location.href);

    },
    goHome:function () {
        window.location.href = './index.html';

    }
};
module.exports = _mm;