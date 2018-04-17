$(function () {
    $('#txtFecha').datepicker({
        format: "dd/mm/yyyy"
    });
    $('#txtFecha2').datepicker({
        format: "dd/mm/yyyy"
    });
    //
    $("#tblDetallePagos").footable();
    //
    $('#dtFrom').datepicker({
        autoclose: true
    }).on('changeDate', function (ev) {
        (ev.viewMode == 'days') ? $(this).datepicker('hide') : '';
    });
    $('#dtTo').datepicker({
        autoclose: true
    }).on('changeDate', function (ev) {
        (ev.viewMode == 'days') ? $(this).datepicker('hide') : '';
    });
    //
    $("#date1, #date2").keyup(function (e) {
        var textSoFar = $(this).val();
        if (e.keyCode != 191) {
            if (e.keyCode != 8) {
                if (textSoFar.length == 2 || textSoFar.length == 5) {
                    $(this).val(textSoFar + "/");
                }
                    //to handle copy & paste of 8 digit
                else if (e.keyCode == 86 && textSoFar.length == 8) {
                    $(this).val(textSoFar.substr(0, 2) + "/" + textSoFar.substr(2, 2) + "/" + textSoFar.substr(4, 4));
                }
            }
            else {
                //backspace would skip the slashes and just remove the numbers
                if (textSoFar.length == 5) {
                    $(this).val(textSoFar.substring(0, 4));
                }
                else if (textSoFar.length == 2) {
                    $(this).val(textSoFar.substring(0, 1));
                }
            }
        }
        else {
            //remove slashes to avoid 12//01/2014
            $(this).val(textSoFar.substring(0, textSoFar.length - 1));
        }
    });
    //
    $('#collapsePagos').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconPagos').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconPagos').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    })
    //
    var $ftable3 = $('#tblDetallePagos');
    $('#change-page-size3').change(function (e) {
        e.preventDefault();
        var pageSize3 = $(this).val();
        $ftable3.data('page-size', pageSize3);
        $ftable3.trigger('footable_initialized');
    });
    $('#change-nav-size2').change(function (e) {
        e.preventDefault();
        var navSize3 = $(this).val();
        $ftable3.data('limit-navigation', navSize3);
        $ftable3.trigger('footable_initialized');
    });
    //
    $("#BtnExportPayDet").click(function () {
        $('#tblDetallePagosHidden').table2excel({
            exclude: ".noExl",
            name: "Listado de Pagos",
            filename: "Listado_Pagos",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            columns: []
        });
    });
    //
    $("#btnExportPaymentDetail").click(function () {
        var startDate = $('#dtFrom').datepicker("getDate");
        var endDate = $('#dtTo').datepicker("getDate");
        if (startDate && endDate) {
            if (compareDates(startDate, endDate)) {
                startDate = startDate.toJSON();
                endDate = endDate.toJSON();

                window.location = BaseAddress + 'Policies/GetPaymentsReport?jsonPolicyIds=' + JSON.stringify(getSelectedPolicies())
                                       + "&startDate=" + startDate
                                       + "&endDate=" + endDate;
            } else {
                showAlertMessage("#errorMessage", "La fecha desde debe ser anterior a la fecha hasta");
            }
        } else {
            showAlertMessage("#errorMessage", "Debe seleccionar fechas desde y hasta");
        }
    });
});