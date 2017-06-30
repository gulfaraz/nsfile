angular.module('sandboxApp', [])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.status = {
            "frontend" : "Online"
        };

        $scope.active = {
            f: null,
            ns: null
        };

        $scope.mapping = {
            file: {
                f1: [ "ns1", "ns3" ],
                f2: [ "ns1" ],
                f3: [],
                f4: [ "ns1", "ns2" ],
                f5: [ "ns2" ]
            },
            ns: {
                ns1: [ "f1", "f2", "f4" ],
                ns2: [ "f4", "f5" ],
                ns3: [ "f1" ],
                ns4: []
            }
        };

        $scope.clicked = function (value, type) {
            $scope.active[type] = value;
        };

        $scope.isHighlight = function (value, type) {
            if(type === "f") {
                return $scope.mapping.file[value].indexOf($scope.active.ns) > -1;
            }
            if(type === "ns") {
                return $scope.mapping.ns[value].indexOf($scope.active.f) > -1;
            }
        };

        $scope.fa = function () {
            return $scope.active.f;
        };

        $scope.fh = function () {
            return ($scope.mapping.ns[$scope.active.ns] || []).indexOf($scope.active.f) > -1;
        };

        $scope.fn = function () {
            return ($scope.mapping.file[$scope.active.f] || []).length > 0;
        };

        $scope.na = function () {
            return $scope.active.ns;
        };

        $scope.nh = function () {
            return ($scope.mapping.file[$scope.active.f] || []).indexOf($scope.active.ns) > -1;
        };

        $scope.nf = function () {
            return ($scope.mapping.ns[$scope.active.ns] || []).length > 0;
        };

        $scope.hasData = function () {
            var line = "Showing data in namespace " + $scope.active.ns + " from file " + $scope.active.f;
            return line;
        };

        $http.get('/api').then(function (response) {
            $scope.status.backend = response.data.status;
        });
    }]);
