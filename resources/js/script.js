feather.replace();

$(function(){
    let audio = $('#audio')[0];
    audio.preload = "auto";
    let list = 0;

    $.get('resources/js/data.json', function(res){
        showTable();

        $('#audio').attr('src', 'resources/audios/' + res[0].audio);
        $('#artist').attr('src', 'resources/images/' + res[0].image);
        $('#artist').attr('alt', res[0].title);
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
            $('#artist').addClass('rotation');
        });
    
        $('#btn-pause').on('click', function(){
            audioTracker();

            $(this).hide();

            audio.pause();

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

                $('#btn-play').trigger('click');
            } else {
                list = res.length;
                // $(this).addClass('in-active');
                // $(this).attr('disabled', true);
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

                $('#btn-play').trigger('click');
            } else {
                list = 0;
                // $(this).addClass('in-active');
                // $(this).attr('disabled', true);
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

        // $('#audio-track').on('change', function(){
        //     let totalDuration = audio.duration * 1000;
        //     $(this).val(totalDuration);
        // });

        $('#btn-show').on('click', function(){
            $(this).toggleClass('rotate');
            $('#song-list-table').toggleClass('d-none');
            $('.container-wrapper').toggleClass('justify-content-between');
            $('.artist-wrapper').toggleClass('d-flex flex-row justify-content-start w-100');
            $('.artist-image').toggleClass('shrink-image');
            $('.artist-details').toggleClass('text-left ml-4');
            $('#artist-info').toggleClass('shrink-size-p');
            $('#song-title').toggleClass('shrink-size-h2');
        });
    
        audio.onended = function(){
            $('#btn-next').trigger('click');
            $('#artist').addClass('rotation');
            $('#btn-play').hide();
            $('#btn-pause').show();
        }

        function showTable(){
            let songs = [];
            res.forEach(element => {
                let play_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                let content = '\
                <tr>\
                    <td>\
                        <div class="d-flex flex-column align-items-start">\
                            <a href="now-playing.php?id='+element.id+'" class="btn-play text-dark">\
                                '+play_icon+'\
                            </a>\
                        </div>\
                    </td>\
                    <td>\
                        <span>'+element.title+'</span>\
                        <span>'+element.artist+'</span>\
                    </td>\
                    <td>3:12</td>\
                </tr>';
                songs.push(content);
            });

            $('#tbody').append(songs);
        }

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