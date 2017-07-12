/**
 * Created by hxsd on 2017/06/30.
 */
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