$(document).ready(() => {
    var audio = $('#audio')[0];
    var count = (-1);
    var list = 0;

    $.get('resources/js/data.json', function(res){
        $('#audio').attr('src', 'resources/audios/' + res[0].audio);
        $('#artist').attr('src', 'resources/images/' + res[0].image);
        $('#song-title').html(res[0].title);
        $('#artist-info').html(res[0].artist);

        $('#btn-settings').on('click', function(){
            $(this).toggleClass('in-active');
            $('#dropdown-settings').toggle(100);
        });
    
        $('#btn-repeat').on('click', function(){
            audio.loop = true;
            $(this).toggleClass('in-active');
            if($(this).attr('title') == "Repeat: Off"){
                $(this).attr('title', 'Repeat: On');
            }else{
                $(this).attr('title', 'Repeat: Off');
            } 
        });
    
        $('#btn-stop').on('click', function(){
            audio.load();
            $('#btn-play').show();
            $('#btn-pause').hide();
            if ($('#artist').hasClass('rotation')) {
                $('#artist').removeClass('rotation');
            }
        });
    
        $('#btn-play').on('click', function(){
            audio.play();
            $(this).hide();
            $('#btn-pause').show();
            $('#btn-pause').addClass('in-active');
            $('#artist').addClass('rotation');
        });
    
        $('#btn-pause').on('click', function(){
            audio.pause();
            $(this).hide();
            $('#btn-play').show();
            $('#artist').removeClass('rotation');
        });
        
        $('#btn-back').on('click', function(){
            list = list - 1;
            audio.load();
            $('#artist').removeClass('rotation');
            $('#btn-play').show();
            $('#btn-pause').hide();

            $('#audio').attr('src', 'resources/audios/' + res[list].audio);
            $('#artist').attr('src', 'resources/images/' + res[list].image);
            $('#song-title').html(res[list].title);
            $('#artist-info').html(res[list].artist);
        });

        $('#btn-next').on('click', function(){
            list = list + 1;
            audio.load();
            $('#artist').removeClass('rotation');
            $('#btn-play').show();
            $('#btn-pause').hide();

            $('#audio').attr('src', 'resources/audios/' + res[list].audio);
            $('#artist').attr('src', 'resources/images/' + res[list].image);
            $('#song-title').html(res[list].title);
            $('#artist-info').html(res[list].artist);
        });
    
        $('#btn-volume').on('click', function(){       
            count = count + 1;
    
            if (count == 0) {
                audio.volume = 0;
                $(this).addClass('in-active');
                $('.volume-x').removeClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
                $(this).attr('title', 'Volume 0%');
            }else if(count == 1){
                audio.volume = 0.25;
                $(this).removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').removeClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
                $(this).attr('title', 'Volume 25%');
            }else if(count == 2){
                audio.volume = 0.5;
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').removeClass('d-none');
                $('.volume-2').addClass('d-none');
                $(this).attr('title', 'Volume 50%');
            }else if(count == 3){
                audio.volume = 1;
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').removeClass('d-none');
                $(this).attr('title', 'Volume 100%');
                count = (-1);
            }
        });
    
        audio.onended = function(){
            $('#artist').removeClass('rotation');
            $('#btn-play').show();
            $('#btn-pause').hide();
        }
    });
});