var client = null;

var modalUIFUpdateInformation = (function () {

    init = function () {

        // Muestro el modal para la actualización de información.
        $('#ModalUIFUpdateNatualPerson').modal('show');

    };

    return {
        init: init
    }

})();

var ModalUIFLastInformation = (function () {

    init = function () {

        $.ajax({
            url: BaseAddress + "UIFRequest/GetUIFRequest",
            dataType: 'json',
            type: 'GET',
            success: function (result) {

                if (result.Success) {

                    $('#UIFActualDataTBody').empty();

                    // Si es persona jurídica.
                    if (result.Data.IsLegalPerson) {

                        var rows = '<tr><td>DENOMINACION O RAZÓN SOCIAL</td><td>' + result.Data.BusinessName + '</td></tr>' +
                            '<tr><td>FECHA DE INSCRIPCIÓN REGISTRAL</td><td>' + result.Data.EnrollmentDate + '</td></tr>' +
                            '<tr><td>NRO. DE INSCRIPCIÓN REGISTRAL</td><td>' + result.Data.EnrollmentNumber + '</td></tr>' +
                            '<tr><td>CUIT / CDI</td><td>' + result.Data.DocumentNumber + '</td></tr>' +
                            '<tr><td>FECHA DE ESCRITURA CONSTITUTIVA O FECHA DEL CONTRATO</td><td>' + result.Data.ContractDate + '</td></tr>' +
                            '<tr><td>DOMICILIO LEGAL</td><td>' + result.Data.Address + '</td></tr>' +
                            '<tr><td>CÓDIGO POSTAL</td><td>' + result.Data.ZipCode + '</td></tr>' +
                            '<tr><td>LOCALIDAD</td><td>' + result.Data.Locality + '</td></tr>' +
                            '<tr><td>PROVINCIA</td><td>' + result.Data.Province + '</td></tr>' +
                            '<tr><td>TELÉFONO DE LA SEDE SOCIAL</td><td>' + result.Data.Phone + '</td></tr>' +
                            '<tr><td>MAIL</td><td>' + result.Data.EMail + '</td></tr>' +
                            '<tr><td>NOMBRE y APELLIDO REPRESENTANTE LEGAL, APODERADO</td><td>' + result.Data.LegalRepresentative + '</td></tr>';

                        $('#UIFActualDataTBody').append(rows);
                    }
                    else {

                        // Si es persona Natural.
                        var rows = '<tr><td>NOMBRE</td><td>' + result.Data.FirstName + '</td></tr>' +
                            '<tr><td>APELLIDO</td><td>' + result.Data.LastName + '</td></tr>' +
                            '<tr><td>FECHA DE NACIMIENTO</td><td>' + result.Data.BirthDate + '</td></tr>' +
                            '<tr><td>LUGAR DE NACIMIENTO</td><td>' + result.Data.PlaceBirth + '</td></tr>' +
                            '<tr><td>SEXO</td><td>' + result.Data.Sex + '</td></tr>' +
                            '<tr><td>NACIONALIDAD</td><td>' + result.Data.Nacionality + '</td></tr>' +
                            '<tr><td>ESTADO CIVIL</td><td>' + result.Data.MaritalStatus + '</td></tr>' +
                            '<tr><td>TIPO DE DOCUMENTO</td><td>' + result.Data.DocumentType + '</td></tr>' +
                            '<tr><td>CUIT/CUIL/CDI</td><td>' + result.Data.DocumentNumber + '</td></tr>' +
                            '<tr><td>DOMICILIO PARTICULAR</td><td>' + result.Data.Address + '</td></tr>' +
                            '<tr><td>LOCALIDAD</td><td>' + result.Data.Locality + '</td></tr>' +
                            '<tr><td>TELEFONO</td><td>' + result.Data.Phone + '</td></tr>' +
                            '<tr><td>MAIL</td><td>' + result.Data.EMail + '</td></tr>' +
                            '<tr><td>PROFESION/OFICIO/INDUSTRIA/ACT. PRINCIPAL QUE REALICE</td><td>' + result.Data.ProfessionalActivity + '</td></tr>';

                        $('#UIFActualDataTBody').append(rows);
                    }

                    // Asigno el cliente.
                    client = result.Data;

                    // Muestro el modal.
                    $('#ModalUIFLastInformation').modal('show');
                }
                else {

                    bootbox.alert("Error al intentar obtener la información personal.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {

                bootbox.alert("Error al intentar obtener la información personal.");
            }

        });

        // Inicializo las validaciones del formulario.
        $('#UIFLastPInformationForm').validate({
            rules: {
                UIFLastPInformationCheckbox: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "UIFLastPInformationCheckbox") {
                    error.insertAfter("#UIFLastPInformationCheckboxDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                UIFLastPInformationCheckbox: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Botón "Confirmar Datos".
        $('#modalConfirmBtnOk').on('click', function (e) {

            $.ajax({
                url: BaseAddress + "UIFRequest/PostConfirmInformationPersonal",
                data: {
                    clientId: client.ClientId
                },
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                    $('#loaderModalLastPInformation').modal('show');
                },
                success: function (result) {

                    $('#loaderModalLastPInformation').modal('hide');

                    if (result.Success) {

                        $("#modalInfoText").empty();
                        $("#modalInfoText").append("Nro. de gestión asignado " + result.Data + ".");
                        $("#modalInfo").modal({
                            keyboard: false
                        });

                        $('#ModalUIFLastInformation').modal('hide');

                    }
                    else {

                        $("#modalInfoText").empty();
                        $("#modalInfoText").append("No se pudo actualizar la información.");
                        $("#modalInfo").modal({
                            backdrop: 'static',
                            keyboard: false
                        });

                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {

                    $('#loaderModalLastPInformation').modal('hide');

                    $("#modalInfoText").empty();
                    $("#modalInfoText").append("No se pudo actualizar la información.");
                    $("#modalInfo").modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                }

            });

        });

        // Botón "Confirmar Datos".
        $('#btnUIFModalConfirm').on('click', function (e) {

            // Debe aceptar los terminos y condiciones.
            if ($("#UIFLastPInformationForm").valid()) {

                $('#modalConfirm').modal('show');

            }

        });

        // Botón "Actualizar Datos".
        $('#btnUIFModalUpdateData').on('click', function (e) {

            // Oculto el modal de la ultima información.
            $('#ModalUIFLastInformation').modal('hide');

            modalUIFUpdateInformation.init();

        });

    };

    return {
        init: init
    };

})();

$(document).ready(function () {

    ModalUIFLastInformation.init();

});