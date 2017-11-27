/**
 * Created by Administrator on 2017-11-27.
 */
require('./index.css');
var _mm = require('util/mm.js');
var header = {
    init: function () {
        this.bindEvent();
    },
    onLoad:function () {
      var keyword = _mm.getUrlParam('keyword');
      if(keyword){
          $('#search-input').val(keyword)
      }
    },
    bindEvent:function () {
        var _this = this;
        //点击搜索提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        $('#search-input').keyup(function (e) {
            if(e.keyCode===13){
                _this.searchSubmit();
            }
        })
    },
    //搜索提交
    searchSubmit:function () {
        var keyWord = $.trim($('#search-input').val());
        if(keyWord){
            window.location.href = '.list.html?keyword=' + keyWord;
        }else{
            _mm.goHome()
        }
    }

};
header.init();