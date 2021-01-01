feather.replace();
$(function(){
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
            if(currentFeather == 'feather-menu'){
                $(this).empty();
                $(this).prepend(x);
            }else{
                $(this).empty();
                $(this).prepend(m);
            }

            $(this).toggleClass('in-active');
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

        var isClicked = 0;
        $('#btn-shuffle').on('click', function(){           
            let titles = [];
            isClicked = isClicked + 1;
            res.forEach(el => {
                titles.push(el.id);
            });
            
            if (isClicked == 1) {
                console.log(shuffle(titles));                
            }else{
                console.log(titles.sort());
                isClicked = 0;
            }

            $(this).toggleClass('in-active');
        });
    
        // $('#btn-stop').on('click', function(){
        //     audio.load();
        //     $('#btn-play').show();
        //     $('#btn-pause').hide();
        //     if ($('#artist').hasClass('rotation')) {
        //         $('#artist').removeClass('rotation');
        //     }
        // });
    
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
            $('#artist').removeClass('rotation');

            if(list > (-1)){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#artist').attr('src', 'resources/images/' + res[list].image);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-next').hasClass('in-active')){
                    $('#btn-next').removeClass('in-active');
                    $('#btn-next').attr('disabled', false);
                }

                audio.play();
                $('#btn-play').hide();
                $('#btn-pause').show();
                $('#artist').addClass('rotation');
            } else {
                $(this).addClass('in-active');
                $(this).attr('disabled', true);
                $('#artist').addClass('rotation');
            }
        });

        $('#btn-next').on('click', function(){
            list = list + 1;
            $('#artist').removeClass('rotation');

            if(res.length > list){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#artist').attr('src', 'resources/images/' + res[list].image);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-back').hasClass('in-active')){
                    $('#btn-back').removeClass('in-active');
                    $('#btn-back').attr('disabled', false);
                }

                audio.play();
                $('#btn-play').hide();
                $('#btn-pause').show();
                $('#artist').addClass('rotation');
            } else {
                $(this).addClass('in-active');
                $(this).attr('disabled', true);
                $('#artist').addClass('rotation');
            }
        });
        
        $('#btn-volume').on('click', function(){
            $('.range').toggleClass('d-none');
            // $(this).toggleClass('in-active');
        });

        $('.range').on('mouseleave', function(){
            setTimeout(function(){
                $('.range').addClass('d-none');
                $('#btn-volume').removeClass('in-active');
            }, 500);
        });

        $('#volume-range').on('change', function(){
            let volume = $(this).val();
            audio.volume = volume;
            $('#btn-volume').attr('title', 'Volume ' + (volume * 100) + '%');

            if (volume == 0) {
                $('#btn-volume').addClass('in-active');
                $('.volume-x').removeClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume < 0.25){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').removeClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume < 0.75){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').removeClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume == 1){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').removeClass('d-none');
            }
        });
    
        audio.onended = function(){
            $('#btn-next').trigger('click'); // load audio
            audio.play();
            $('#artist').addClass('rotation');
            $('#btn-play').hide();
            $('#btn-pause').show();
        }
    });

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
});