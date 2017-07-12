/**
 * Created by hxsd on 2017/06/26.
 */
// 获取路径参数
function getUrlParams() {

    var params={};

    var url=window.location.href;

    var arr=url.split('?');

    if(arr.length==2){
        var p=arr[1];
    }else{
        return params
    }

    var parr=p.split('&');

    for(var i=0;i<parr.length;i++){

        var kv=parr[i].split('=');

        params[kv[0]]=kv[1]

    }

    return params


}

// getUrlParams()

// 获取模块名
function getM() {

    var url=window.location.href;

    var arr=url.split('#');

    if(arr.length!=2) return false;

    var p=arr[1].split('?');

    return p[0];
}

// 加载模块
function router(m,container) {

    container=container||$('#share')

    // 请求模块
    $.ajax({
        url:'view/'+m+'.html',
        success:function (data) {
            container.html(data)
        }
    })
    // 请求js
    lodejs(m)
}

// 请求js
function lodejs(m) {
    $.ajax({
        url:'js/'+m+'.js'
    })
}

function windowSize() {
    // 1 获取html元素
    var dom=document.documentElement;

    // 2 获取设备宽度
    var w=dom.clientWidth;

    // 3 改变html字体大小
    dom.style.fontSize= w/3.22+"px";
}

$(function () {

    windowSize()

    window.onresize=function(){
        windowSize()
    }

    router('hello')

    setTimeout(function () {
        router('tab')
        router('audio',$('#global'))
    },1500)

    // router('tab')

    // if(!localStorage.count){
    //
    //     localStorage.count=0
    // }
    //
    // localStorage.count++;
    //
    // if(localStorage.count==1){
    //     router('hello')
    // }else{
    //     router('tab')
    //     router('audio',$('#global'))
    // }

    // console.log(localStorage.count)
    //
    // router('audio',$('#global'))

})


