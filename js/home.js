/**
 * Created by hxsd on 2017/06/27.
 */
$(document).ready(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        autoplay:1500,
        autoplayDisableOnInteraction : false,
        paginationClickable:true
    })
})
// ajax请求

var server = "http://musicapi.duapp.com/api.php";
// url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
function getPlayLists(limit,callback) {
    // 访问缓存
    if(isCache()){
        var list=JSON.parse(localStorage.list)
        callback(list)
        console.log('访问缓存')
    }else{
        // 访问网络
        $.ajax({
            // url:'data/topPlayList.json',
            url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            success:function (data) {
                console.log('访问网络')

                var list=data.playlists
                // 把数据存储为字符串
                localStorage.list=JSON.stringify(list)
                // 存储当前缓存时间
                localStorage.cachetime=new Date().getTime()

                callback(data.playlists)
            }
        })
    }

    function isCache(){
        // 判断是否有缓存
        if(!localStorage.list){
            return false
        }
        // 判断是否超过10分钟没更新数据
        if(new Date().getTime()-localStorage.cachetime>=10*60*1000){
            return false
        }

        return true
    }
}

getPlayLists(12,function (data) {
    // 推荐歌单
    var template=$('#template').html()
    for(var i=0;i<data.length;i++){
        var $template=$(template)
        // 跳转到的歌单
        $template.find('a').attr('href','#detail?id='+data[i].id);
        // 点击人数
        $template.find('span').html(data[i].playCount);
        // 歌单封面
        $template.find('img').attr('src',data[i].coverImgUrl);
        // 歌单描述
        $template.find('p').html(data[i].name);
        // 把所有歌单添加到songsList
        $template.appendTo($('.songsList'))
    }
    console.log(data)
})


