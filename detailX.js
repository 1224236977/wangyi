/**
 * Created by hxsd on 2017/06/28.
 */

$('.prev').click(function(){
    console.log('prev')
    router("tab")

})



//请求当前专辑对应的歌曲列表
function getPlayList(id,callback){
    $.ajax({
        type:"get",
        url:"https://api.imjad.cn/cloudmusic?type=playlist&id="+id,
        //url:"json/playlist.json",
        async: true,
        success:function(data){
            callback(data.playlist.tracks)//返回歌曲列表数组
        }
    })
}

var params = gerUrlParms();

var id = params.id;

getPlayList(id,function(data){

    var $musicList = $('#musicList');
    var li = $('.musicItem').html();
    console.log(data)
    for(var i = 0;i<data.length;i++){
        var $li = $(li);
        var music = data[i]

        $li.find('.musicName').html((i+1)+'.&nbsp;'+music.name);
        $li.find('.arter').html("歌手:"+music.ar[0].name);

        if(isCollected(music.id)){
            $li.find('span').removeClass().addClass('yes')
        }else{
            $li.find('span').removeClass().addClass('no')
        }


        $li.appendTo($musicList)

        $li.data("music",music).click(function(){
            var index=$(this).index()
            musicControler.play($(this).data('music'))
            $('#audio-name').html(data[index].name)
            $('#music-pic').attr("src",data[index].al.picUrl)
            $('#audio-user').html(data[index].ar[0].name)

        })
        $li.find('span').data("music",music).click(function(e){
            e.stopPropagation();
            console.log($(this).data("music").id)
            var music = $(this).data("music")
            if(localStorage.collection){
                var list = JSON.parse(localStorage.collection)
                console.log("缓存对象存在")
            //    当前音乐是否被收藏
                if(isCollected(music.id)){
                    list[music.id].isCollected = false;//更改对象里的数据 isCollected的布尔值
                    $(this).removeClass().addClass('no')
                }else{
                    //修改对象数据
                    list[music.id]={"name":music.name,"artist":music.ar[0].name,isCollected:true}
                //    修改视图数据
                    $(this).removeClass().addClass('yes')
                }
            }else{
                console.log("您是第一次缓存")
                localStorage.collection = {};
                var list = localStorage.collection;
                list[music.id] = {"name":music.name,"artist":music.ar[0].name,isCollected:true};
            }
        //    更新缓存信息
            localStorage.collection = JSON.stringify(list);


        })
    }
})
function isCollected(id){
//    将本地缓存中的数据解析为对象
    if(localStorage.collection){
        var list = JSON.parse(localStorage.collection)
    }else{
        return false;
    }

    if(!list){
        return false;
    }else{
        if(list[id]&&list[id].isCollected){
            return true;
        }else{
            return false;
        }
    }
}
