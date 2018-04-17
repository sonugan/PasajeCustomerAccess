var ClientId;
var BaseAddress, myApp;
var loadingModal;

$(function () {
    GetBaseAddress();
    //variable del Modal de carga
    loadingModal = '<div id="loading" class="row"><div class="col-xs-12 text-center"><img id="loading-image" style="width:40px;height:40px;" src="' + BaseAddress + 'Content/img/page-loader.gif" alt="Procesando..." /></div></div>';

    //Maneja el estado activo del menu
    $("#navbar3").find(".active").removeClass("active");
    $('#navbar3').find('a[href="' + location.pathname + '"]').parents('li').addClass('active');

})

function CreateAppAngular() {
    if (myApp == undefined)
        myApp = angular.module('myApp', ['smart-table']);
}

function GetBaseAddress() {
    if (BaseAddress == undefined) {

        BaseAddress = $("#urlHome").text();
    }
}
