CreateAppAngular();
GetBaseAddress();
var scope, mIdTab, Data = [];
//$("table").footable();


myApp.controller('mainCtrlCommunications', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    //window.setInterval(function () {
    //    localData = JSON.parse(JSON.stringify(Data));
    //    $scope.ObtenerDatos();
    //    refreshData();

    //    if (!equalsData()) {
    //        $scope.FiltrarDatos();
    //    }

    //}, 5000);

    $scope.FiltrarDatos = function () {
        var _resultTotal = Enumerable.From(Data)
        .Where(function (x) { return x.GroupId == mIdTab })
        .Select(function (x) { return x })
        .OrderByDescending(function (x) { return x.ProccessDate })
        .ThenBy(function (x) { return x.PolicyNumber })
        .ThenBy(function (x) { return x.TypeDocs.Title })
        .ToArray();

        $scope.rowCollection = [];
        $scope.displayed = []

        $timeout(function () {
            $scope.isLoading = true;

            $timeout(
               function () {

                   $scope.rowCollection = [];

                   for (var row in _resultTotal) {
                       $scope.rowCollection.push(_resultTotal[row]);
                   }

                   $scope.isLoading = false;
               }, 1000);
        }, 500);

    };

    $scope.ObtenerDatos = function () {
        $scope.isLoading = true;

        //TODO: REEMPLAZAR POR USUARIO LOGUEADO
        if (ClientId != null && ClientId != "")
            $.ajax({
                url: BaseAddress + "Documentations/GetCommunications?clientid=" + ClientId,
                cache: false,
                success: function (data) {
                    Data = data;

                    $scope.isLoading = false;
                    $("#tblComunication").show();
                },
                error: function () {
                    $scope.isLoading = false;
                },
                async: false
            });

    }

    $scope.ObtenerDatos();
    refreshData();

    $scope.GetStyle = function (row) {
        if (row.Notifications == 1)
            return 1;
        else
            return 0;
    }

    $(".TabLink").click(function (e) {
        if (document.readyState == 'complete') {
            if (mIdTab > 0) {
                $scope.FiltrarDatos();
            }
            if (mIdTab == 1) {
                $("#texto1").hide();
            }
            else {
                $("#texto1").show();
            }
        }
    });

    $(".nav active TabLink").ready(function (e) {
        $("#texto1").hide();
        if (document.getElementsByClassName("TabLink Default")[0] != undefined) {
            $("#" + document.getElementsByClassName("TabLink Default")[0].id).trigger("click");
            $scope.FiltrarDatos();
        }
    });

    scope = $scope;

}]).directive('stRatio', function () {
    return {
        link: function (scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});

function GetDocument(id) {
    mIdTab = id;
}

function filtrar() {
    setTimeout(function () { scope.FiltrarDatos(); }, 10000)
}

function refreshData() {
    if (Data != [] || Data != null) {
        var notif = 0;
        var longitudReal = document.getElementsByClassName("TabLink").length;
        var longitud = 0;
        for (var i in document.getElementsByClassName("TabLink")) {
            if (document.getElementsByClassName("TabLink")[i].id != undefined) {
                longitud++;
                var _id = document.getElementsByClassName("TabLink")[i].id.replace("idtab", "");

                var _idTab = document.getElementsByClassName("TabLink")[i].id;

                var result = Enumerable.From(Data)
                            .Where(function (x) { return x.GroupId == _id })
                            .Select(function (x) { return x.Notifications })
                            .Sum();
                if (result > 0) {
                    $("#spantab" + _id).text(result);
                    notif = notif + result;
                }
                else
                    $("#spantab" + _id).text("");
            }
        }
        if (notif == 0)
            $("#CommunicatiosNotif").text("");
        else {
            if (longitud == longitudReal)
                $("#CommunicatiosNotif").text(notif);
            else
                $("#CommunicatiosNotif").text(notif / 2);
        }

    }
}

function equalsData() {
    var result = true;
    for (var i in document.getElementsByClassName("TabLink")) {
        if (document.getElementsByClassName("TabLink")[i].id != undefined) {
            var _id = document.getElementsByClassName("TabLink")[i].id.replace("idtab", "");

            var _idTab = document.getElementsByClassName("TabLink")[i].id;


            var result1 = Enumerable.From(Data)
                        .Where(function (x) { return x.GroupId == _id })
                        .Select(function (x) { return x.Notifications })
                        .Sum();
            var result2 = Enumerable.From(localData)
                        .Where(function (x) { return x.GroupId == _id })
                        .Select(function (x) { return x.Notifications })
                        .Sum();

            if (result1 !== result2) {
                result = false;
            }
        }
    }
    return result;
}