<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Simple music player with neumorphism effects">

    <title>Music Player</title>

    <link rel="stylesheet" href="resources/sass/now-playing.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

    <!-- plugins -->
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/feather-icons/dist/feather.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- ends here -->
</head>
<body>
    <div class="container-fluid">
        <div class="container-wrapper justify-content-between vh-100">
            <!-- header -->
            <div class="header my-3">
                <div class="header-items">
                    <button type="button" class="header-buttons active" id="btn-go-back" title="Back">
                        <i data-feather="chevron-left"></i>
                    </button>
                </div>

                <div class="header-items h4 mb-0">Now Playing</div>

                <div class="header-items">
                    <div class="volume-range">
                        <div class="range active d-none">
                            <span class="mr-3">
                                <i data-feather="volume-2"></i>
                            </span>
                            <input type="range" name="volume-range" id="volume-range" min="0" max="1" value="1" step="0.01">
                        </div>
                    </div>

                    <button type="button" class="header-buttons active" id="btn-volume" title="Volume 100%">
                        <div class="volume-x d-none">
                            <i data-feather="volume-x"></i>
                        </div>
                        <div class="volume d-none">
                            <i data-feather="volume"></i>
                        </div>
                        <div class="volume-1 d-none">
                            <i data-feather="volume-1"></i>
                        </div>
                        <div class="volume-2">
                            <i data-feather="volume-2"></i>
                        </div>
                    </button>
                </div>
            </div>
            <!-- ends here -->

            <!-- artist -->
            <div class="artist mb-3">
                <div class="artist-wrapper">
                    <div class="artist-disc mb-2">
                        <div class="artist-image">
                            <div class="disc-circle">
                                <div class="disc-circle-child"></div>
                            </div>
                            <img id="artist" width="350" height="auto">
                        </div>
                    </div>
                    <div class="artist-details">
                        <p id="artist-info" class="mb-0">Marshmello ft. Bastille</p>
                        <h2 id="song-title">Happier</h2>
                    </div>
                </div>
            </div>
            <!-- ends here -->

            <div class="audio-tracker w-100 mb-3">
                <div class="time-tracker">
                    <div id="current-time" class="mr-2">2:30</div>
                    <input class="audio-track" type="range" name="audio-track" id="audio-track" min="0" step="1">
                    <div id="duration" class="ml-2">5:10</div>
                </div>
            </div>

            <div class="actions mb-3 mb-sm-4">                    
                <div class="filters justify-content-between justify-content-sm-start">
                    <button type="button" class="btn-action active" id="btn-shuffle" title="Shuffle">
                        <i data-feather="shuffle"></i>
                    </button>
                    <button type="button" class="btn-action active" id="btn-back" title="Back">
                        <i data-feather="skip-back"></i>
                    </button>
                    <button type="button" class="btn-action active" id="btn-pause" style="display: none;" title="Pause">
                        <i data-feather="pause"></i>
                    </button>
                    <button type="button" class="btn-action active" id="btn-play" title="Play">
                        <i data-feather="play"></i>
                    </button>
                    <button type="button" class="btn-action active" id="btn-next" title="Next">
                        <i data-feather="skip-forward"></i>
                    </button>
                    <button type="button" class="btn-action active" id="btn-repeat" title="Repeat: Off">
                        <i data-feather="repeat"></i>
                    </button>
                </div>
                <div class="filters d-none d-sm-flex justify-content-end">
                    <button type="button" class="btn-action active" id="btn-list" title="List">
                        <i data-feather="list"></i>
                    </button>
                </div>
            </div>

            <div class="show-list d-flex d-sm-none mb-3">
                <button type="button" class="btn-show" id="btn-show">
                    <i data-feather="chevron-up"></i>
                </button>
            </div>

            <div class="table-responsive d-none mb-3" id="song-list-table">
                <table class="table table-hover">
                    <tbody id="tbody"></tbody>
                </table>
            </div>
        </div>
    </div>

    <audio id="audio" controls class="d-none" type="audio/mp3"></audio>

    <script src="resources/js/now-playing.js"></script> 
</body>
</html>