/**
 * Created by hxsd on 2017/06/28.
 */
var musicController={
    server: "http://musicapi.duapp.com/api.php",
    play:function (music) {
        $.ajax({
            url:this.server+"?type=url&id="+music.id,
            success:function (data) {
                $('#audio').attr('src',data.data[0].url)
                var audio=$('#audio').get(0)
                $('.music_btn').removeClass('play').addClass('pause')
                audio.play()
            }
        })
    }
}

$('.music_btn').click(function () {
    if($(this).hasClass('play')){
        audio.play()
        $(this).removeClass('play').addClass('pause')
        $('.pmgressbar').width(0)
        var Time=0
        var cWidth=$('.controller').width();//宽度
        var Audio=$('#audio').get(0)
        Time=Audio.duration;//输出时长
        timer=setInterval(function () {
            var dis = 30/1000/Time;
            i++;
            $('.pmgressbar').width(dis*cWidth*i)
            if(i==Time){
                clearInterval(timer)
                i=0;
            }
        },30)
    }else{
        audio.pause()
        $(this).removeClass('pause').addClass('play')
        clearInterval(timer)
    }
    console.log(audio.duration)
})

