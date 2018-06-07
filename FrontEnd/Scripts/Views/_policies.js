
$(function () {
    var SELECT_POLICIES_ID = '#PoliciesChecks';

    //$("table").footable();

    $('#BtnChangeMailAddress').bind('changeMailAddressEvent', function () {
        //getProvincias
        getProvinces();
        //initComponent
        initComponentsCorrespondenceAddress();
        // Carga del multiselect de solicitudes
        getMultiSelectCorrespondenceModal();
        // Limpio el modal.
        cleanCorrespondenceAddressModal();
        // Muestro el modal.
        $('#modalCAddress').modal('show');
    })

    $("#BtnChangeMailAddress").on('click', function (e) {
        var sendbutton = $(e.target);
        if (hasSelectedPolicies()) {
            sendbutton.trigger("changeMailAddressEvent");
        }
    });

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
                AnalyticsEventManager.sendDownloadEvent("Policies", "Payments Report")
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

    //draw select Modal de Cambio de Correspondencia
    getMultiSelectCorrespondenceModal = function () {
        var polices = getSelectedPolicyNumbers();
        if (polices && polices.length > 0) {
            $(SELECT_POLICIES_ID).empty();
            $.each(polices, function (index, item) {
                var text = item;

                $(SELECT_POLICIES_ID).append(
                        $('<option/>')
                            .attr('value', item.applicationId)
                            .text(text.policyNumber)
                    );
            });
            $(SELECT_POLICIES_ID).selectpicker('refresh');
            $(SELECT_POLICIES_ID).selectpicker('selectAll');
        }
    }

    //
    cleanCorrespondenceAddressModal = function () {

        // Dirección.
        $('#modalCAddressStreet').val("");

        // Piso.
        $('#modalCAddressFloor').val("");

        // Departamento.
        $('#modalCAddressApartment').val("");

        // Localidad.
        $('#modalCAddressLocality').val("");

        // Código Postal
        $('#modalCAddressZipCode').val("");

        // Combo Provincia.
        $('#modalCAddressProvince option[value="-1"]').prop('selected', 'selected');

        // Checkbox.
        $('#modalCAddressCheck').prop('checked', false);
    }

    ValidMultiSelect = function (selector) {
        var value = $(selector).val();
        if (value == null || value == undefined) {
            return false;
        }

        return true;
    }

    // Boton guardar.
    $('#btnSaveModalCAddress').on('click', function () {

        var obj = {
            ZipCode: $('#modalCAddressZipCode').val(),
            Locality: $('#modalCAddressLocality').val(),
            Address: $('#modalCAddressStreet').val(),
            Floor: $('#modalCAddressFloor').val(),
            Apartment: $('#modalCAddressApartment').val(),
            IdProvince: $('#modalCAddressProvince').val(),
            IdApplication: null,
            IdAddressType: 3
        };

        var policies = $(SELECT_POLICIES_ID).val();

        policies = (policies) ? policies.toString() : "";
        // Compruebo que se halla tildado el checkbox.
        if ($("#modalCAddressForm").valid() && ValidMultiSelect(SELECT_POLICIES_ID)) {

            // Cierro el modal.
            $('#modalCAddress').modal('hide');
            // Muestro el loader.
            $("#loaderModal").modal('show');

            var url = BaseAddress + "Policies/ChangeAddress?policies=" + policies;

            $.ajax({
                url: url,
                data: obj,
                dataType: 'json',
                type: 'POST',
                success: function (result) {
                    // Oculto el loader.
                    $("#loaderModal").modal('hide');
                    //// Si hubo errores.
                    if (!result.Success) {

                        var itemsErrors = "";
                        $.each(result.Errors, function (index, item) {
                            itemsErrors = itemsErrors + "<li>" + item.Description + "</li>";
                        });

                        $("#modalInfoText").empty();
                        $("#modalInfoText").append('<ul>' + itemsErrors + '</ul>');
                        $("#modalInfo").modal({
                            backdrop: 'static',
                            keyboard: false
                        });

                    }
                    else {

                        $("#modalInfoText").empty();
                        $("#modalInfoText").append("La solicitud ha sido generada con el número " + result.Data.RequestNumber + ". Su pedido será confirmado a la brevedad.");
                        $("#modalInfo").modal({
                            backdrop: 'static',
                            keyboard: false
                        });

                        // Cierro el modal.
                        $('#modalCAddress').modal('hide');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    // Oculto el loader.
                    $("#loaderModal").modal('hide');
                    // Muestro el modal.
                    $('#modalCAddress').modal('show');

                    $("#modalInfoText").empty();
                    $("#modalInfoText").append("Error al intentar guardar la solicitud de cambio de dirección");
                    $("#modalInfo").modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                }

            });

        }

    });

    getProvinces = function () {

        $.ajax({
            url: BaseAddress + "DropDown/GetProvinces",
            dataType: 'json',
            type: 'GET',
            success: function (data) {

                if (data != null) {
                    $.each(data, function (i, item) {
                        $('#modalCAddressProvince').append($("<option></option>").attr("value", item.Id).text(item.Name));
                    });
                }
            }

        });

    }

    initComponentsCorrespondenceAddress = function () {
        // Inicializo las validaciones del formulario.
        $('#modalCAddressForm').validate({
            rules: {
                modalCAddressStreet: {
                    required: true
                },
                modalCAddressLocality: {
                    required: true
                },
                modalCAddressZipCode: {
                    required: true
                },
                modalCAddressProvince: {
                    required: true
                },
                modalCAddressCheck: {
                    required: true
                },
                PoliciesChecks: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalCAddressCheck") {
                    error.insertAfter("#modalCAddressCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalCAddressStreet: "Debe ingresar la calle",
                modalCAddressLocality: "Debe ingresar la localidad",
                modalCAddressZipCode: "Debe ingresar el código postal",
                modalCAddressProvince: "Debe seleccionar una provincia",
                modalCAddressCheck: "Debe confirmar que ha leído los términos y condiciones",
                PoliciesChecks: "Debe seleccionar al menos una póliza."
            }
        });
    }
});
