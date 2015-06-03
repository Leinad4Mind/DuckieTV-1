/**
 * Torrent Control for the torrenting window
 */
DuckieTV.controller('TorrentCtrl', ["$scope", "$rootScope", "DuckieTorrent", "$q", "SidePanelState",
    function($scope, $rootScope, DuckieTorrent, $q, SidePanelState) {

        $scope.ports = [];
        $scope.session = false;
        $scope.authToken = localStorage.getItem('utorrent.token');
        //uTorrent.setPort(localStorage.getItem('utorrent.port'));
        $scope.rpc = null;
        $scope.polling = false;

        $scope.removeToken = function() {
            localStorage.removeItem("utorrent.token");
            localStorage.removeItem("utorrent.preventconnecting");
            window.location.reload();
        };

        $scope.getTorrentClientName = function() {
            return DuckieTorrent.getClientName();
        };

        $scope.getFiles = function(torrent) {
            torrent.getFiles().then(function(files) {
                console.log('received files!',
                    files);
                torrent.files = files.map(function(file) {
                    file.isMovie = file.name.match(/mp4|avi|mkv|mpeg|mpg|flv/g);
                    if (file.isMovie) {
                        file.searchFileName = file.name.split('/').pop().split(' ').pop();
                    }
                    return file;
                });
            });

        };

        DuckieTorrent.getClient().AutoConnect().then(function(rpc) {
            $scope.rpc = rpc;
        });
    }
]);