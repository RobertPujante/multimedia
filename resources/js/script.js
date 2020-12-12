$(document).ready(() => {
    var audio = $('#audio')[0];
    var count = (-1);
    
    if (audio.ended) {
        $('#artist').removeClass('rotation');
    }

    $('#btn-settings').on('click', function(){
        $(this).toggleClass('in-active');
        var dropdown = document.getElementById('dropdown-settings');
        if(dropdown.style.maxHeight){
            dropdown.style.maxHeight = null;
        }else{
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        }
    });

    $('#btn-repeat').on('click', function(){
        audio.loop = true;
        $(this).toggleClass('in-active');
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

    $('#btn-volume').on('click', function(){       
        count = count + 1;

        if (count == 0) {
            audio.volume = 0;
            $('.volume-x').removeClass('d-none');
            $('.volume').addClass('d-none');
            $('.volume-1').addClass('d-none');
            $('.volume-2').addClass('d-none');
            $(this).attr('title', 'Volume 0%');
        }else if(count == 1){
            audio.volume = 0.25;
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
});