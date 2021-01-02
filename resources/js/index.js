feather.replace();

$(document).ready(function(){
    $.get('../app/route.php', function(res){
        let data = JSON.parse(res);

        // let songs = [];
        // res.forEach(element => {
        //     let content = '\
        //     <div class="col">\
        //         <a href="now-playing.php?id='+element.id+'" class="mb-3 overflow-hidden d-flex flex-column">\
        //             <img class="card-thumbnail rounded" alt="Artist Image" width="275" height="auto" src="resources/images/'+element.image+'">\
        //             <span class="h6">'+element.title+ ' - ' + element.artist + '</span>\
        //         </a>\
        //     </div>';
        //     songs.push(content);
        // });

        // $('#song-lists').append(songs);
    });
});