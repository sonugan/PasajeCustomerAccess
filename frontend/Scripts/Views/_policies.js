
$(function () {

    //$("table").footable();

    $("#BtnExportPolicies").click(function () {
        var selected = $('#filterpolicies').find(':selected').val();
        if (selected == "Activa") {
            $('#tblactivasHidden').table2excel({
                exclude: ".noExl",
                name: "Listado de Pólizas",
                filename: "Listado_Polizas",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                //exclude_inputs: true,
                //columns: [8, 0, 1, 2, 3, 4, 5, 6], //Check, póliza, tomador, asegurado, emision, estadodesc, cobertura, prima
                columns: [0, 1, 2, 3, 4, 5, 6], //Check, póliza, tomador, asegurado, emision, estadodesc, cobertura, prima
                
            });
        } else {
            $('#tblactivasHidden').table2excel({
                exclude: ".noExl",
                name: "Listado de Pólizas",
                filename: "Listado_Polizas",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                //exclude_inputs: true,
                //columns: [6, 0, 1, 2, 3, 4] //Check, póliza, tomador, asegurado, emision, estadodesc
                columns: [0, 1, 2, 3, 4] //Check, póliza, tomador, asegurado, emision, estadodesc
            });
        }
    });

    $('table.footable').footable();

    $('.footable').trigger('footable_resize');

    $("form").submit(function () {
        $("input").removeAttr("disabled");
    });
    //
    checkBoxes = function (me) {
        $(me).closest("table").find('input[type="checkbox"]:visible').not(me).prop('checked', me.checked);
    }

    hasSelectedPolicies = function () {
        if ($("#divInactivas").is(":visible")) {
            if (document.querySelectorAll('#tblinactivas input[type="checkbox"]:checked').length === 0) {
                $('#myModal').modal('show');
                return false;
            }
        }
        else {
            if (document.querySelectorAll('#tblactivas input[type="checkbox"]:checked').length === 0) {
                $('#myModal').modal('show');
                return false;
            }
        }
        return true;
    }

    $("#btnPoliza, #btnAnual, #btnCobertura, #btnClausula, #btnCertificado").click(function () {
        hasSelectedPolicies()
    });

    $('#btnDetalle').click(function () {
        var policies = new Array();
        hasSelectedPolicies()

        if ($("#divInactivas").is(":visible")) {
            $('#tblinactivas').find('tr').each(function () {
                var row = $(this);
                if (row.find('input[type="checkbox"]').is(':checked')) {
                    policies.push(row.find('u').text());
                }
            });
        }
        else {
            $('#tblactivas').find('tr').each(function () {
                var row = $(this);
                if (row.find('input[type="checkbox"]').is(':checked')) {
                    policies.push(row.find('u').text());
                }
            });
        }    
    });
    
    $("#exportDetallePago").click(function () {
        if($('#txtFechaDesde').datepicker("getDate") && $('#txtFechaDesde').datepicker("getDate")
            && $('#txtFechaDesde').datepicker("getDate").getTime() === $('#txtFechaHasta').datepicker("getDate").getTime()) {
            window.location = BaseAddress + 'Policies/GetPaymentsReport?jsonPolicyIds=' + JSON.stringify(policies)
                                   + "&fechaDesde=" + $('#txtFechaDesde').datepicker("getDate")
                                   + "&fechaHasta=" + $('#txtFechaHasta').datepicker("getDate");
        }
    })

    $('#txtFechaDesde').datepicker({
        format: "dd/mm/yyyy"
    });
    $('#txtFechaHasta').datepicker({
        format: "dd/mm/yyyy"
    });


    //

});
