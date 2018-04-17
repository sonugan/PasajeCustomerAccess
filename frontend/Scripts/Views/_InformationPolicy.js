var frecuencyPaymentMeans = (function () {

    initFrecuencyPaymentMeans = function () {

        initComponentsFrecuencyPaymentMeans();

    },

    initComponentsFrecuencyPaymentMeans = function () {

        // Boton Modificar.
        $('#btnUpdateFrecuencyPaymentMeans').on('click', function () {


            $('#modalFrecuencyPaymentMeans').modal('show');

            //// Muestro el loader.
            //$("#loaderModal").modal('show');

            //// Limpio el modal.
            //cleanHomeAddressModal();

            //// Inicializo el modal.
            //$.ajax({
            //    url: BaseAddress + "/Policies/ChangeAddressRequest?applicationId=" + $('#ApplicationId').val() + "&addressTypeId=1",
            //    dataType: 'json',
            //    type: 'GET',
            //    success: function (data) {

            //        // Oculto el loader.
            //        $("#loaderModal").modal('hide');

            //        // Solo si es nuevo seteo los datos.
            //        if (data.RequestNumber != 0) {
            //            setDataHomeAddressModal(data);
            //        }

            //        // Muestro el modal.
            //        $('#modalHAddress').modal('show');

            //    }
            //});

        });

        //// Boton guardar.
        //$('#btnSaveModalHAddress').on('click', function () {

        //    // Compruebo que se halla tildado el checkbox.
        //    if ($("#modalHAddressForm").valid()) {

        //        // Muestro el loader.
        //        $("#loaderModal").modal('show');

        //        var obj = {
        //            ZipCode: $('#modalHAddressZipCode').val(),
        //            Locality: $('#modalHAddressLocality').val(),
        //            Address: $('#modalHAddressStreet').val(),
        //            Floor: $('#modalHAddressFloor').val(),
        //            Apartment: $('#modalHAddressApartment').val(),
        //            IdProvince: $('#modalHAddressProvince').val(),
        //            IdApplication: $('#ApplicationId').val(),
        //            IdAddressType: 1
        //        };

        //        $.ajax({
        //            url: BaseAddress + "/Policies/ChangeAddressRequest",
        //            data: obj,
        //            dataType: 'json',
        //            type: 'POST',
        //            success: function (result) {

        //                // Oculto el loader.
        //                $("#loaderModal").modal('hide');

        //                if (!result.Success) {

        //                    var itemsErrors = "";
        //                    $.each(result.Errors, function (index, item) {
        //                        itemsErrors = itemsErrors + "<li>" + item.Description + "</li>";
        //                    });

        //                    $("#modalInfoText").empty();
        //                    $("#modalInfoText").append('<ul>' + itemsErrors + '</ul>');
        //                    $("#modalInfo").modal({
        //                        backdrop: 'static',
        //                        keyboard: false
        //                    });

        //                }
        //                else {

        //                    $("#modalInfoText").empty();
        //                    $("#modalInfoText").append("Se guardo su solicitud con Nro. : " + result.Data.RequestNumber);
        //                    $("#modalInfo").modal({
        //                        backdrop: 'static',
        //                        keyboard: false
        //                    });

        //                    // Cierro el modal.
        //                    $('#modalHAddress').modal('hide');
        //                }
        //            },
        //            error: function (xhr, ajaxOptions, thrownError) {

        //                $("#modalInfoText").empty();
        //                $("#modalInfoText").append("Error al intentar guardar la solicitud de cambio de dirección");
        //                $("#modalInfo").modal({
        //                    backdrop: 'static',
        //                    keyboard: false
        //                });
        //            }

        //        });

        //    }

        //});

    }

    cleanFrecuencyPaymentMeans = function () {

        //// Nro. de Solicitud, Fecha de Solicitud y Estado de Solicitud.
        //$('#modalHAddressRequestNumber').text("");
        //$('#modalHAddressRequestDate').text("");
        //$('#modalHAddressRequestState').text("");

        //// Dirección.
        //$('#modalHAddressStreet').val("");

        //// Piso.
        //$('#modalHAddressFloor').val("");

        //// Departamento.
        //$('#modalHAddressApartment').val("");

        //// Localidad.
        //$('#modalHAddressLocality').val("");

        //// Código Postal
        //$('#modalHAddressZipCode').val("");

        //// Combo Provincia.
        //$('#modalHAddressProvince option[value="-1"]').prop('selected', 'selected');

        //// Checkbox.
        //$('#modalHAddressCheck').prop('checked', false);
    }

    setDataFrecuencyPaymentMeans = function (data) {

        //// Nro. de Solicitud, Fecha de Solicitud y Estado de Solicitud.
        //$('#modalHAddressRequestNumber').text(data.RequestNumber)
        //$('#modalHAddressRequestDate').text(data.RequestDate);
        //$('#modalHAddressRequestState').text(data.State);

        //// Dirección.
        //$('#modalHAddressStreet').val(data.Address);

        //// Piso.
        //$('#modalHAddressFloor').val(data.Floor);

        //// Departamento.
        //$('#modalHAddressApartment').val(data.Apartment);

        //// Localidad.
        //$('#modalHAddressLocality').val(data.Locality);

        //// Código Postal
        //$('#modalHAddressZipCode').val(data.ZipCode);

        //// Combo Provincia.
        //$('#modalHAddressProvince option[value="' + data.IdProvince + '"]').prop('selected', 'selected');

        //// Checkbox.
        //$('#modalHAddressCheck').prop('checked', false);

    }

    return {
        initFrecuencyPaymentMeans: initFrecuencyPaymentMeans
    }

})();

var paymentMeansCollapses = (function () {

    var collapses = [];
    
    paymentMeansInit = function () {

        collapses.push($('#CollapseCreditCard'));
        collapses.push($('#CollapseBankDeposit'));
        collapses.push($('#CollapseDirectDebit'));

        $('#CollapseBankDeposit').collapse();
        $('#CollapseDirectDebit').collapse();

    },

    paymentMeansOptionsClick = function (opt) {

        $.each(collapses, function (index, item) {

            if (item[0].id == opt.getAttribute("data-collapse")) {
                item.collapse('show');
            }
            else {
                item.collapse('hide');
            }
        });

    }

    return {
        paymentMeansOptionsClick: paymentMeansOptionsClick,
        paymentMeansInit: paymentMeansInit
    }

})();

$(document).ready(function () {

    // Inicializo el modal para "Dirección Particular".
    frecuencyPaymentMeans.initFrecuencyPaymentMeans();

    // Inicializo los collapse de "Medio de pago".
    paymentMeansCollapses.paymentMeansInit();

});                