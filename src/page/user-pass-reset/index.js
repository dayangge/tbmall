
/**
 * Created by Administrator on 2017-11-29.
 */
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
    data:{
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init:function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
        this.loadStepUsername();
    },
    bindEvent:function () {
        var _this = this;
        //第一步输入用户名后的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if(username){
                //用户名存在
                _user.getQuestion(username,function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入用户名')
            }
        });
        //第二部用户名存在，输入用户名密码后的点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer
                },function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入密码提示问题答案')
            }
        });
        //第三部用户名存在，修改密码后的点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if(password && password.length>=6){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username:_this.data.username,
                    passwordNew: password,
                    forgetToken :_this.data.token
                },function (res) {
                    window.location.href = './result.html?type=pass-reset'
                },function (errMsg) {
                    formError.show(errMsg)
                })
            }else{
                formError.show('请输入不少于6位的新密码')
            }
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
    },
    //加载输入用户名的一步
    loadStepUsername:function () {
        $('.step-username').show();
        },
    //加载输入密码提示问题答案
    loadStepQuestion:function () {
        //清除错误提示
        formError.hide();
        //做容器切换
        $('.step-username').hide()
            .siblings('.step-question').show().find('.question').text(this.data.question);
    },
    //加载输密码
    loadStepPassword:function () {
        formError.hide();
        //做容器切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }

};
$(function () {
    page.init()
})