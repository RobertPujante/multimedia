$(document).ready(() => {
    var audio = $('#audio')[0];
    var count = (-1);
    var list = 0;

    $.get('resources/js/data.json', function(res){
        $('#audio').attr('src', 'resources/audios/' + res[0].audio);
        $('#artist').attr('src', 'resources/images/' + res[0].image);
        $('#song-title').html(res[0].title);
        $('#artist-info').html(res[0].artist);

        $('#btn-menu').on('click', function(){
            let x = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            let m = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            let currentFeather = $(this).children()[0].classList[1];
            $(this).toggleClass('in-active');
            if(currentFeather == 'feather-menu'){
                $(this).empty();
                $(this).prepend(x);
            }else{
                $(this).empty();
                $(this).prepend(m);
            }
        });

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
            if(list > (-1)){
                audio.load();
                $('#artist').removeClass('rotation');
                $('#btn-play').show();
                $('#btn-pause').hide();

                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#artist').attr('src', 'resources/images/' + res[list].image);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-next').hasClass('in-active')){
                    $('#btn-next').removeClass('in-active');
                    $('#btn-next').attr('disabled', false);
                }
            } else {
                $(this).addClass('in-active');
                $(this).attr('disabled', true);
            }
        });

        $('#btn-next').on('click', function(){
            list = list + 1;
            if(res.length > list){
                audio.load();
                $('#artist').removeClass('rotation');
                $('#btn-play').show();
                $('#btn-pause').hide();

                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#artist').attr('src', 'resources/images/' + res[list].image);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-back').hasClass('in-active')){
                    $('#btn-back').removeClass('in-active');
                    $('#btn-back').attr('disabled', false);
                }
            } else {
                $(this).addClass('in-active');
                $(this).attr('disabled', true);
            }
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