/**
 * Created by hxsd on 2017/06/28.
 */
(function () {
    $("#prev").click(function () {
        router("tab");
    });
    var params = getUrlParams();
    console.log(params.id);
    function playlist(id, callback) {
        $.ajax({
            url: "https://api.imjad.cn/cloudmusic?type=playlist&id=" + id,
            success: function (data) {
                console.log(data);
                callback(data);
            }
        });
    }
    playlist(params.id, function (data) {
        console.log(data.playlist.coverImgUrl);
        $(".detail-wrap").css("background-image","url("+data.playlist.coverImgUrl+")");
        $(".detail-info").children("img").attr("src",data.playlist.coverImgUrl);
        $('.content_').html(data.playlist.name);
        $('.author_').children("img").attr("src",data.playlist.creator.avatarUrl);
        $('.author_').children("span").html(data.playlist.creator.nickname);
        var data=data.playlist.tracks;
        var $musiclist = $('#musiclist');
        var li = $('#listitem').html();
        for (var i = 0; i < data.length; i++) {
            var $li = $(li);
            $li.children('.music').html(data.name);

            $li.children('.artist').html(data[i].ar[0].name);

            if(isCollected(data[i]["id"])){//加载时，判断是否被收藏

                $li.children('span').addClass("yes");
            }{
                $li.children('span').addClass("no");
            }
            $li.appendTo($musiclist);
            $li.data("music",data[i]).click(function () {

                var music=$(this).data('music');

                musicControler.play(music);

            });
            $li.find('span').data('music',data[i]).click(function (e) {
                e.stopPropagation();//阻止默认事件

                var musicId=$(this).data("music")["id"];

                if(localStorage.collection){//判断是否有缓存数据

                    var list=JSON.parse(localStorage.collection);

                    if(!list[musicId]){//若在缓存中，该id没有被记录，若记录且所对应的键值为false

                        list[musicId]=true;
                    }else{
                        list[musicId]=false;
                    }
                    localStorage.collection=JSON.stringify(list);
                }else{
                    var collection={};

                    collection[$(this).data('music')["id"]]=true;

                    localStorage.collection=JSON.stringify(collection);
                }
                $(this).toggleClass("yes");
            });
        }
    });
    function isCollected(id){//加载时判断这条数据的ID值是否被记录且该ID的boolean
        if(localStorage.collection){
            var list=JSON.parse(localStorage.collection);
        }else{
            return false
        }
        if(list[id]){
            return true
        }else{
            return false
        }
    }
})();