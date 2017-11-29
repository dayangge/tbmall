/**
 * Created by Administrator on 2017-11-20.
 */
require('../common/index');
require('../common/nav-simple/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var formError = {
    show : function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg)
    },
    hide : function (errMsg) {
        $('.error-item').hide().find('.err-msg').text()
    }
};

var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        //登录按钮的点击
        $('#submit').click(function () {
                _this.submit()
            });
        $('.user-content').keyup(function (e) {
            if(e.keyCode===13){
                _this.submit()
            }
        })
    },
    //提交表单
    submit:function () {
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
            //表单验证结果
            validateResult = this.formValidate(formData)
        if(validateResult.ststus){
            //验证给出
            _user.login(formData,function (res) {
                window.location.href = _mm.getUrlParam('redriect') || './index.html';
            },function (errMsg) {
                formError.show(errMsg)
            })
        }else {
            //验证失败
            formError.show(validateResult.msg)
        }
    },



    formValidate:function (formData) {
        var result = {
            status:false,
            msg : ''
        };
        if(!_mm.valiate(formData.username,'require')){
            result.msg = "账户不能空";
            return result;
        };
        if(!_mm.valiate(formData.password,'require')){
            result.msg = "密码不能空";
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result
    }

};
$(function () {
    page.init()
})