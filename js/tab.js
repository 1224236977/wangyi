/**
 * Created by hxsd on 2017/06/27.
 */
router('home',$('#tabcontainer'))
// 切换ac
$('.nav li').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
})
// 时下流行
$('.n1').click(function () {
    router('home',$('#tabcontainer'))
})
// 歌单
$('.n2').click(function () {
    router('songlist',$('#tabcontainer'))
})
// 排行榜
$('.n3').click(function () {
    router('order',$('#tabcontainer'))
})
// 热门歌手
$('.n4').click(function () {
    router('hotsong',$('#tabcontainer'))
})

