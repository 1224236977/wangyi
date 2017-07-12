/**
 * Created by hxsd on 2017/06/28.
 */
function getPlaylist(id,callback) {
    // 访问网络
    $.ajax({
        // url:'data/playlist.json',
        url:"https://api.imjad.cn/cloudmusic?type=playlist&id="+id,
        success:function (data) {
            callback(data.playlist)
        }
    })
}

var parmas=getUrlParams()

var i=0;

var timer;

getPlaylist(parmas.id,function (data) {

    var musicLi=$('#musicIten').html()
    // 背景图
    $('.blbg').css("background-image","url("+data.coverImgUrl+")")
    // 歌单封面
    $('.itemPic img').attr('src',data.coverImgUrl)
    // 点击人数
    $('.songB_left').find('span').html(data.playCount)
    // 歌单描述
    $('.song_des').html(data.name)
    // 作者头像
    $('.artist_pic img').attr('src',data.creator.avatarUrl)
    // 作者姓名
    $('.artist_name').html(data.creator.nickname)

    var music=data.tracks

    for(var i=0;i<music.length;i++){

        var $musicLi=$(musicLi)

        $musicLi.find('.music_num').html(i+1);

        $musicLi.find('.music_Name').html(music[i].ar[0].name);

        $musicLi.find('.music_avatar').html(music[i].name);

        if(isCollected(music[i]['id'])){
            $musicLi.find('span').addClass('yes')
        }else{
            $musicLi.find('span').addClass('no')
        }

        $musicLi.appendTo($('#musicList'))

        $musicLi.data('music',music[i]).click(function () {
            $(this).find('.music_avatar').addClass('music_avatarAc')
            $(this).siblings().find('.music_avatar').removeClass('music_avatarAc')
            $(this).find('.music_num').addClass('music_numAc')
            $(this).siblings().find('.music_num').removeClass('music_numAc')
            var Music=$(this).data('music')
            $('#share').addClass('padB_50')
            $('#global').show()
            musicController.play(Music)
            $('.music_name').html(Music.name)
            $('.music_al').html(Music.ar[0].name)
            $('.containerAvatar img').attr('src',Music.al.picUrl)
            $('.pmgressbar').width(0)
            var Time=0
            var cWidth=$('.controller').width();//宽度
            var Audio=$('#audio').get(0)
                Time=Audio.duration;//输出时长
            console.log(Time)
            clearInterval(timer)
            timer=setInterval(function () {
                var dis = 30/1000/Time;
                i++;
                $('.pmgressbar').width(dis*cWidth*i)
                if(i==Time){
                    clearInterval(timer)
                    i=0;
                }
            },30)

            console.log($(this).data('music'))
        })

        $musicLi.find('span').data('music',music[i]).click(function (e) {

            e.stopPropagation() //阻止默认事件

            var music=$(this).data('music')

            if(!localStorage.collection){
                localStorage.collection={}
            }

            var list=JSON.parse(localStorage.collection);

            // 当前音乐是否被收藏
            if(isCollected(music.id)){ //若在缓存中，该ID没有被记录，若记录且对应的键值为false
                console.log(music.id)
                // 修改对象并保存到缓存中
                list[music.id].isCollected = false;//更改对象里的数据 isCollected的布尔值
                //    修改视图数据
                $(this).removeClass().addClass('no')
            }else{
                // 修改对象并保存到缓存中
                list[music.id]={"name":music.name,"artist":music.ar[0].name,isCollected:true}
                //    修改视图数据
                $(this).removeClass().addClass('yes')
            }

            // //    更新缓存信息
            localStorage.collection = JSON.stringify(list);
        })

    }
})

function isCollected(id) {
    // 判断收藏列表对象是否存在
    var list=JSON.parse(localStorage.collection);
    // 列表对象中是否存在指定音乐id对应的数据；
    // 在数据中查找isCollected   true false
    if(list[id]&&list[id].isCollected){
        return true
    }else{
        return false
    }
}

$('.songs_top').click(function () {
    router('tab')
})



