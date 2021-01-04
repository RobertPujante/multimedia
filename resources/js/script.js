feather.replace();

$(function(){
    "use strict";

    let audio = $('#audio')[0];
    let list = 0;

    audio.preload = "auto";

    $.get('resources/js/data.json', function(res){

        $('#audio').attr('src', 'resources/audios/' + res[0].audio);

        $('#song-title').html(res[0].title);
        $('#artist-info').html(res[0].artist);
        
        let isClicked = 0;
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

        $('#btn-repeat').on('click', function(){
            audio.loop = true;
            $(this).toggleClass('in-active');
            if($(this).attr('title') == "Repeat: Off"){
                $(this).attr('title', 'Repeat: On');
            }else{
                $(this).attr('title', 'Repeat: Off');
            } 
        });

        $('#btn-play').on('click', function(){
            audioTracker();
            $(this).hide();
            audio.play();
            
            $('#btn-pause').show();
        });
    
        $('#btn-pause').on('click', function(){
            audioTracker();

            $(this).hide();

            audio.pause();

            $('#btn-play').show();
        });
        
        $('#btn-back').on('click', function(){
            list = list - 1;

            if(list > (-1)){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-next').hasClass('in-active')){
                    $('#btn-next').removeClass('in-active');
                    $('#btn-next').attr('disabled', false);
                }

                $('#btn-play').trigger('click');
            } else {
                list = res.length;
            }

            showTable(list);
        });

        $('#btn-next').on('click', function(){
            list = list + 1;

            if(res.length > list){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-back').hasClass('in-active')){
                    $('#btn-back').removeClass('in-active');
                    $('#btn-back').attr('disabled', false);
                }

                $('#btn-play').trigger('click');
            } else {
                list = 0;
            }

            showTable(list);
        });
        
        $('#btn-volume').on('click', function(){
            $('.range').toggleClass('d-none');
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
            $(this).attr('title', (volume * 100) + '%');

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

        $('#btn-show').on('click', function(){          
            $(this).toggleClass('rotate');
            $('.container-wrapper').toggleClass('justify-content-between');
            $('#song-list-table').toggleClass('d-none');
            $('.music-icon').toggleClass('shrink-music-icon');
            $('#artist-info').toggleClass('shrink-size-p');
            $('#song-title').toggleClass('shrink-size-h2');
        });

        $('.table-row').on('click', function(){
            let id = $(this).attr('id');
            $('#audio').attr('src', )
        });

        function showTable(list = ''){
            let songs = [];

            $('#tbody').empty();
            for (let i = 0; i < res.length; i++) {
                let content = '';
                let el = res[i];
                if (list == i) {
                    content += '\
                    <tr class="table-primary table-row" id="'+el.id+'">\
                        <td>\
                            <span>'+el.title+'</span>\
                            <span> - </span>\
                            <span>'+el.artist+'</span>\
                        </td>\
                        <td>3:12</td>\
                    </tr>';
                }else{
                    content += '\
                    <tr class="table-row" id="'+el.id+'">\
                        <td>\
                            <span>'+el.title+'</span>\
                            <span> - </span>\
                            <span>'+el.artist+'</span>\
                        </td>\
                        <td>3:12</td>\
                    </tr>';
                }
                songs.push(content);
            }

            $('#tbody').append(songs);
        }

        showTable();

        function audioTracker(){
            let minsDuration = Math.floor(audio.duration / 60);
            let secsDuration = Math.floor(audio.duration % 60);
            $('#duration').html(minsDuration + ':' + secsDuration);
    
            setInterval(function(){         
                let currentTime = Math.floor(audio.currentTime);
                let mins = Math.floor(currentTime / 60);  
                let secs = currentTime % 60;
    
                // mins = (mins < 10) ? '0' + mins : mins;
                secs = (secs < 10) ? '0' + secs : secs;
    
                $('#current-time').html(mins + ":" + secs);
    
            }, 0);
        }

        audio.onended = function(){
            $('#btn-next').trigger('click');
            $('#btn-play').hide();
            $('#btn-pause').show();
        }
    });

    // function shuffle(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;
    
    //     while (0 !== currentIndex) {
      
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
    
    //       temporaryValue = array[currentIndex];
    //       array[currentIndex] = array[randomIndex];
    //       array[randomIndex] = temporaryValue;
    //     }
      
    //     return array;
    // }
});