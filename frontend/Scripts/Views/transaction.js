
// Array de los datos de la grilla.
var transactionsList = [];

var transactionModule = (
    function () {

        init = function () {

            $("#findTransactions").on('click', function () {
                getTransactions();
            });
        },

        getTransactions = function () {

            var applicationIds = [];
            var transactionTypesIds = [];

            // Selección de los tipos de transacción.
            var transactionTypeSelected = $("#selectTransactionType").val();
            if (transactionTypeSelected != null) {

                $.each(transactionTypeSelected, function (index, item) {
                    transactionTypesIds.push(item);
                });
            }
            else {

                var options = $("#selectTransactionType").find('option');
                $.each(options, function (index, item) {
                    transactionTypesIds.push(item.value);
                });
            }

            // Selección de las pólizas.
            var policiesSelected = $("#selectPolicies").val();
            if (policiesSelected != null) {

                $.each(policiesSelected, function (index, item) {
                    applicationIds.push(item);
                });
            }
            else {

                var options = $("#selectPolicies").find('option');
                $.each(options, function (index, item) {
                    applicationIds.push(item.value);
                });
            }

            // Muestro el loader.
            $("#loaderModal").modal('show');

            // Limpio la tabla.
            $('#TRequestsTableBody').empty();

            $.ajax({
                url: BaseAddress + "Transaction/GetTransactions",
                data: { transactionTypesIds: transactionTypesIds, applicationIds: applicationIds },
                dataType: 'json',
                type: 'POST',
                success: function (result) {

                    // Oculto el loader.
                    $("#loaderModal").modal('hide');

                    // Asigno la lista a la variable.
                    transactionsList = result.Data;

                    if (result.Data) {

                        $.each(result.Data, function (index, item) {

                            var changeRequestTypeDescription = "";
                            switch (item.TransactionChangeRequestType) {
                                case 1:
                                    changeRequestTypeDescription = "Cambio Domicilio Particular";
                                    break;

                                case 2:
                                    changeRequestTypeDescription = "Cambio Domicilio Fiscal";
                                    break;

                                case 3:
                                    changeRequestTypeDescription = "Cambio Domicilio de Correspondencia";
                                    break;

                                case 4:
                                    changeRequestTypeDescription = "Cambio Teléfono Particular";
                                    break;

                                case 5:
                                    changeRequestTypeDescription = "Cambio Teléfono Celular";
                                    break;

                                case 6:
                                    changeRequestTypeDescription = "Cambio Teléfono Laboral";
                                    break;

                                case 7:
                                    changeRequestTypeDescription = "Cambio e-mail";
                                    break;
                            }

                            var row = '<tr class="text-center">' +
                                            '<td>' + item.TransactionNumber + '</td>' +
                                            '<td>' + item.PolicyNumber + '</td>' +
                                            '<td>' + changeRequestTypeDescription + '</td>' +
                                            '<td>' + item.RequestDate + '</td>' +
                                            '<td>' + item.State + '</td>' +
                                            '<td><button class="glyphicon glyphicon-search" onclick="transactionModule.showModalDetail(' + item.TransactionNumber + ',&quot;' + item.PolicyNumber + '&quot;);"></button></td>'
                                        '</tr>';

                            $('#TRequestsTableBody').append(row);

                        });

                        $('#tableTrabsactions').trigger('footable_initialize');

                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {

                    // Oculto el loader.
                    $("#loaderModal").modal('hide');

                    bootbox.alert("Error al intentar obtener las transacciones.");
                }

            });

        }

        showModalDetail = function (transactionNumber, policyNumber) {

            var data = {};
            $.each(transactionsList, function (index, item) {

                if (transactionNumber == item.TransactionNumber) {
                    data = item;
                    return;
                }

            });

            // Muestro el modal dependiendo del tipo.
            switch (data.TransactionChangeRequestType) {

                // Dirección Particular, Dirección Legal y Dirección Correspondencia
                case 1:
                case 2:
                case 3:

                    $('#modalAddressStreet').html(data.Address);
                    $('#modalAddressFloor').html(data.Floor);
                    $('#modalAddressApartment').html(data.Apartment);
                    $('#modalAddressLocality').html(data.Locality);
                    $('#modalAddressZipCode').html(data.ZipCode);
                    $('#modalAddressProvince').html(data.Province);
                    $('#modalAddressCountry').html(data.Country);
                    
                    if (data.TransactionChangeRequestType == 1) {

                        // Dirección Particular.
                        $('#modalAddressTitle').html("Dirección Particular");

                    } 
                    else if (data.TransactionChangeRequestType == 2) {

                        $('#modalAddressTitle').html("Dirección Legal");
                        // Dirección Legal.

                    } 
                    else {

                        // Dirección Correspondencia.
                        $('#modalAddressTitle').html("Dirección Correspondencia");
                    }

                    // Muestro el modal.
                    $('#modalAddress').modal('show');

                    break;

                // Teléfono Particular, Teléfono Celular y Teléfono Laboral.
                case 4:
                case 5:
                case 6:

                    $('#modalPhonesCountryCode').html(data.CountryCodeNumber);
                    $('#modalPhonesProvinceCode').html(data.ProvinceCodeNumber);
                    $('#modalPhonesNumber').html(data.Number);
                    $('#modalPhonesInternalNumberRow').hide();

                    if (data.TransactionChangeRequestType == 4) {

                        // Dirección Teléfono.
                        $('#modalPhonesTitle').html("Teléfono Particular");
                    }
                    else if (data.TransactionChangeRequestType == 5) {

                        // Dirección Celular.
                        $('#modalPhonesTitle').html("Teléfono Celular");
                    }
                    else {

                        // Dirección Laboral.
                        $('#modalPhonesTitle').html("Teléfono Laboral");
                        $('#modalPhonesInternalNumber').html(data.InternalNumber);
                        $('#modalPhonesInternalNumberRow').show();
                    }

                    // Muestro el modal.
                    $('#modalPhones').modal('show');

                    break;

                // Teléfono Email
                case 7:

                    $('#modalEmailsEmail').html(data.Email);

                    // Muestro el modal.
                    $('#modalEmails').modal('show');

                    break;

                // Aceptación de documentación
                case 8:

                    // Limpio todo el contenido de la grilla.
                    $('#tBodyDocumentPendingSignature').empty();

                    for (var i = 0; i < data.Documents.length; i++) {

                        var item = '<tr><td>' + data.Documents[i].DocumentType + '</td>' +
                                '<td>' + data.Documents[i].DocumentName + '</td>' +
                                '<td>' + data.Documents[i].DestinationContent + '</td>' +
                                '<td>' + data.Documents[i].SignatureOnlineStatus + '</td>' +
                                '<td>' + data.Documents[i].SignatureOnlineDate + '</td>' +
                                '<td>' + data.Documents[i].SignatureOnlineUser + '</td>' +
                                '<td>' + data.Documents[i].SignatureInPersonStatus + '</td>' +
                                '<td>' + data.Documents[i].SignatureInPersonDate + '</td>' +
                                '<td>' + data.Documents[i].SignatureInPersonUser + '</td></tr>';

                        $('#modalDocumentPendingSignatureTitle').html("Aceptación de documentación - Póliza Nro.: " + policyNumber + " - Transacción Nro.: " + transactionNumber);

                        $('#tBodyDocumentPendingSignature').append(item);

                    }

                    $('#modalDocumentPendingSignature').modal('show');

                    break;
            }

        }

        return {
            init: init,
            showModalDetail: showModalDetail
        }
    })();


$(document).ready(function () {

    transactionModule.init();

    $("#tableTrabsactions").footable();

});