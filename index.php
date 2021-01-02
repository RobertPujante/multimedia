<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Simple music player with neumorphism effects">

    <title>Music Player</title>

    <link rel="stylesheet" href="resources/sass/style.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

    <!-- plugins -->
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/feather-icons/dist/feather.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- ends here -->

</head>
<body>
    <div class="container-fluid">
        <div class="row no-gutters my-3" id="song-lists">
            <div class="h3 mb-3">My Music</div>

            <div class="table-responsive">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>
                                <div class="d-flex flex-column align-items-start">
                                    <a href="now-playing.php?id=1" class="btn-play">
                                        <i data-feather="play"></i>
                                    </a>
                                </div>
                            </td>
                            <td>Holy</td>
                            <td>Justin Beiber</td>
                            <td>3:12</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="d-flex flex-column align-items-start">
                                    <a href="now-playing.php?id=1" class="btn-play">
                                        <i data-feather="play"></i>
                                    </a>
                                </div>
                            </td>
                            <td>Holy</td>
                            <td>Justin Beiber</td>
                            <td>3:12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="resources/js/index.js"></script> 
</body>
</html>