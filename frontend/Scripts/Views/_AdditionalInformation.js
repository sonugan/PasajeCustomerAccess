
// Inicializo el combo Provincia de las ediciones de direcciones.
function getProvinces() {

    $.ajax({
        url: BaseAddress + "/Policies/GetProvinces",
        dataType: 'json',
        type: 'GET',
        success: function (data) {

            if (data != null) {
                $.each(data, function (i, item) {
                    $('#modalHAddressProvince').append($("<option></option>").attr("value", item.Id).text(item.Name));
                    $('#modalLAddressProvince').append($("<option></option>").attr("value", item.Id).text(item.Name));
                    $('#modalCAddressProvince').append($("<option></option>").attr("value", item.Id).text(item.Name));
                });
            }
        }

    });

}

var homeAddressModal = (function () {

    initHomeAddress = function () {

        initComponentsHomeAddress();

    },

    initComponentsHomeAddress = function () {

        // Inicializo las validaciones del formulario.
        $('#modalHAddressForm').validate({
            rules: {
                modalHAddressStreet: {
                    required: true
                },
                modalHAddressLocality: {
                    required: true
                },
                modalHAddressZipCode: {
                    required: true
                },
                modalHAddressProvince: {
                    required: true
                },
                modalHAddressCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalHAddressCheck") {
                    error.insertAfter("#modalHAddressCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalHAddressStreet: "Debe ingresar la calle",
                modalHAddressLocality: "Debe ingresar la localidad",
                modalHAddressZipCode: "Debe ingresar el código postal",
                modalHAddressProvince: "Debe seleccionar una provincia",
                modalHAddressCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalHAddress').on('click', function () {

            // Limpio el modal.
            cleanHomeAddressModal();

            // Muestro el modal.
            $('#modalHAddress').modal('show');

        });

        // Boton guardar.
        $('#btnSaveModalHAddress').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalHAddressForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    ZipCode: $('#modalHAddressZipCode').val(),
                    Locality: $('#modalHAddressLocality').val(),
                    Address: $('#modalHAddressStreet').val(),
                    Floor: $('#modalHAddressFloor').val(),
                    Apartment: $('#modalHAddressApartment').val(),
                    IdProvince: $('#modalHAddressProvince').val(),
                    IdApplication: $('#ApplicationId').val(),
                    IdAddressType: 1
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangeAddressRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalHAddress').modal('hide');
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

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

    }

    cleanHomeAddressModal = function () {

        // Dirección.
        $('#modalHAddressStreet').val("");

        // Piso.
        $('#modalHAddressFloor').val("");

        // Departamento.
        $('#modalHAddressApartment').val("");

        // Localidad.
        $('#modalHAddressLocality').val("");

        // Código Postal
        $('#modalHAddressZipCode').val("");

        // Combo Provincia.
        $('#modalHAddressProvince option[value="-1"]').prop('selected', 'selected');

        // Checkbox.
        $('#modalHAddressCheck').prop('checked', false);
    }

    return {
        initHomeAddress: initHomeAddress
    }

})();

var legalAddressModal = (function () {

    initLegalAddress = function () {

        initComponentsLegalAddress();

    },

    initComponentsLegalAddress = function () {

        // Inicializo las validaciones del formulario.
        $('#modalLAddressForm').validate({
            rules: {
                modalLAddressStreet: {
                    required: true
                },
                modalLAddressLocality: {
                    required: true
                },
                modalLAddressZipCode: {
                    required: true
                },
                modalLAddressProvince: {
                    required: true
                },
                modalLAddressCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalLAddressCheck") {
                    error.insertAfter("#modalLAddressCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalLAddressStreet: "Debe ingresar la calle",
                modalLAddressLocality: "Debe ingresar la localidad",
                modalLAddressZipCode: "Debe ingresar el código postal",
                modalLAddressProvince: "Debe seleccionar una provincia",
                modalLAddressCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalLAddress').on('click', function () {

            // Limpio el modal.
            cleanLegalAddressModal();

            // Muestro el modal.
            $('#modalLAddress').modal('show');

        });

        // Boton guardar.
        $('#btnSaveModalLAddress').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalLAddressForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    ZipCode: $('#modalLAddressZipCode').val(),
                    Locality: $('#modalLAddressLocality').val(),
                    Address: $('#modalLAddressStreet').val(),
                    Floor: $('#modalLAddressFloor').val(),
                    Apartment: $('#modalLAddressApartment').val(),
                    IdProvince: $('#modalLAddressProvince').val(),
                    IdApplication: $('#ApplicationId').val(),
                    IdAddressType: 2
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangeAddressRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalLAddress').modal('hide');
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

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

    }

    cleanLegalAddressModal = function () {

        // Dirección.
        $('#modalLAddressStreet').val("");

        // Piso.
        $('#modalLAddressFloor').val("");

        // Departamento.
        $('#modalLAddressApartment').val("");

        // Localidad.
        $('#modalLAddressLocality').val("");

        // Código Postal
        $('#modalLAddressZipCode').val("");

        // Combo Provincia.
        $('#modalLAddressProvince option[value="-1"]').prop('selected', 'selected');

        // Checkbox.
        $('#modalLAddressCheck').prop('checked', false);
    }

    return {
        initLegalAddress: initLegalAddress
    }

})();

var correspondenceAddressModal = (function () {

    initCorrespondenceAddress = function () {

        initComponentsCorrespondenceAddress();

    },

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
                modalCAddressCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalCAddress').on('click', function () {

            // Limpio el modal.
            cleanCorrespondenceAddressModal();

            // Muestro el modal.
            $('#modalCAddress').modal('show');

        });

        // Boton guardar.
        $('#btnSaveModalCAddress').on('click', function () {

            var obj = {
                ZipCode: $('#modalCAddressZipCode').val(),
                Locality: $('#modalCAddressLocality').val(),
                Address: $('#modalCAddressStreet').val(),
                Floor: $('#modalCAddressFloor').val(),
                Apartment: $('#modalCAddressApartment').val(),
                IdProvince: $('#modalCAddressProvince').val(),
                IdApplication: $('#ApplicationId').val(),
                IdAddressType: 3
            };

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalCAddressForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                $.ajax({
                    url: BaseAddress + "/Policies/ChangeAddressRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

                        // Si hubo errores.
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

    }

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

    return {
        initCorrespondenceAddress: initCorrespondenceAddress
    }

})();

var mailModal = (function () {

    initMailModal = function () {

        initComponentsMail();
    },

    initComponentsMail = function () {

        // Inicializo las validaciones del formulario.
        $('#modalMailForm').validate({
            rules: {
                modalEmail: {
                    required: true,
                    email: true
                },
                modalEmailConfirm: {
                    required: true,
                    email: true
                },
                modalMailCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalMailCheck") {
                    error.insertAfter("#modalMailCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalEmail: "Debe ingresar un email válido",
                modalEmailConfirm: "Debe ingresar un email válido",
                modalMailCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalMail').on('click', function () {

            // Limpio el modal.
            cleanMailModal();

            // Muestro el modal.
            $('#modalMail').modal('show');

        });

        // Boton guardar.
        $('#btnSaveModalMail').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalMailForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    Email: $('#modalEmail').val(),
                    EmailConfirm: $('#modalEmailConfirm').val(),
                    IdApplication: $('#ApplicationId').val(),
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangeMailRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalMail').modal('hide');
                        }
                    }

                });

            }

        });

    }

    cleanMailModal = function () {

        // Mail.
        $('#modalEmail').val("");

        // Mail confirmación.
        $('#modalEmailConfirm').val("");

        // Checkbox.
        $('#modalMailCheck').prop('checked', false);
    }

    return {
        initMailModal: initMailModal
    }

})();

var modalHPhone = (function () {

    initHPhoneModal = function () {

        initComponentsHPhone();
    },

    initComponentsHPhone = function () {

        // Inicializo las validaciones del formulario.
        $('#modalHPhoneForm').validate({
            rules: {
                modalHPhoneCountryCode: {
                    required: true,
                    number: true
                },
                modalHPhoneProvinceCode: {
                    required: true,
                    number: true
                },
                modalHPhoneNumber: {
                    required: true,
                    number: true
                },
                modalHPhoneCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalHPhoneCheck") {
                    error.insertAfter("#modalHPhoneCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalHPhoneCountryCode: "Debe ingresar el código de país",
                modalHPhoneProvinceCode: "Debe ingresar el código de provincia",
                modalHPhoneNumber: "Debe ingresar el número teléfonico",
                modalHPhoneCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalHPhone').on('click', function () {

            // Limpio el modal.
            cleanHPhoneModal();

            // Muestro el modal.
            $('#modalHPhone').modal('show');

        });

        // Boton guardar.
        $('#btnSaveModalHPhone').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalHPhoneForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    IdApplication: $('#ApplicationId').val(),
                    CountryCodeNumber: $('#modalHPhoneCountryCode').val(),
                    ProvinceCodeNumber: $('#modalHPhoneProvinceCode').val(),
                    Number: $('#modalHPhoneNumber').val(),
                    IdPhoneType: 4
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangePhoneRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalHPhone').modal('hide');
                        }
                    }
                });
            }
        });
    }

    cleanHPhoneModal = function () {

        // Código de País.
        $('#modalHPhoneCountryCode').val("");

        // Código de Provincia.
        $('#modalHPhoneProvinceCode').val("");

        // Número.
        $('#modalHPhoneNumber').val("");

        // Checkbox.
        $('#modalHPhoneCheck').prop('checked', false);
    }

    return {
        initHPhoneModal: initHPhoneModal
    }

})();

var modalCPhone = (function () {

    initCPhoneModal = function () {

        initComponentsCPhone();
    },

    initComponentsCPhone = function () {

        // Inicializo las validaciones del formulario.
        $('#modalCPhoneForm').validate({
            rules: {
                modalCPhoneCountryCode: {
                    required: true,
                    number: true
                },
                modalCPhoneProvinceCode: {
                    required: true,
                    number: true
                },
                modalCPhoneNumber: {
                    required: true,
                    number: true
                },
                modalCPhoneCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalCPhoneCheck") {
                    error.insertAfter("#modalCPhoneCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalCPhoneCountryCode: "Debe ingresar el código de país",
                modalCPhoneProvinceCode: "Debe ingresar el código de provincia",
                modalCPhoneNumber: "Debe ingresar el número teléfonico",
                modalCPhoneCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalCPhone').on('click', function () {

            // Limpio el modal.
            cleanCPhoneModal();

            // Muestro el modal.
            $('#modalCPhone').modal('show');
            
        });

        // Boton guardar.
        $('#btnSaveModalCPhone').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalCPhoneForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    IdApplication: $('#ApplicationId').val(),
                    CountryCodeNumber: $('#modalCPhoneCountryCode').val(),
                    ProvinceCodeNumber: $('#modalCPhoneProvinceCode').val(),
                    Number: $('#modalCPhoneNumber').val(),
                    IdPhoneType: 5
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangePhoneRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalCPhone').modal('hide');
                        }
                    }
                });
            }
        });
    }

    cleanCPhoneModal = function () {

        // Código de País.
        $('#modalCPhoneCountryCode').val("");

        // Código de Provincia.
        $('#modalCPhoneProvinceCode').val("");

        // Número.
        $('#modalCPhoneNumber').val("");

        // Checkbox.
        $('#modalCPhoneCheck').prop('checked', false);
    }

    setDataCPhoneModal = function (data) {

        // Código de País.
        $('#modalCPhoneCountryCode').val(data.CountryCodeNumber);

        // Código de Provincia.
        $('#modalCPhoneProvinceCode').val(data.ProvinceCodeNumber);

        // Número.
        $('#modalCPhoneNumber').val(data.Number);

        // Checkbox.
        $('#modalCPhoneCheck').prop('checked', false);
    }

    return {
        initCPhoneModal: initCPhoneModal
    }

})();

var modalJPhone = (function () {

    initJPhoneModal = function () {

        initComponentsJPhone();
    },

    initComponentsJPhone = function () {

        // Inicializo las validaciones del formulario.
        $('#modalJPhoneForm').validate({
            rules: {
                modalJPhoneCountryCode: {
                    required: true,
                    number: true
                },
                modalJPhoneProvinceCode: {
                    required: true,
                    number: true
                },
                modalJPhoneNumber: {
                    required: true,
                    number: true
                },
                modalJInternalNumber: {
                    required: true,
                    number: true
                },
                modalJPhoneCheck: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {

                // Para el error del checkbox se inserta el label despues del div que contiene el checkbox.
                if (element.attr("name") == "modalJPhoneCheck") {
                    error.insertAfter("#modalJPhoneCheckDiv");
                }
                else {
                    error.insertAfter(element);
                }
            },
            messages: {
                modalJPhoneCountryCode: "Debe ingresar el código de país",
                modalJPhoneProvinceCode: "Debe ingresar el código de provincia",
                modalJPhoneNumber: "Debe ingresar el número teléfonico",
                modalJInternalNumber: "Debe ingresar el número de interno",
                modalJPhoneCheck: "Debe confirmar que ha leído los términos y condiciones"
            }
        });

        // Boton Modificar.
        $('#btnUpdateModalJPhone').on('click', function () {

            // Limpio el modal.
            cleanJPhoneModal();

            // Muestro el modal.
            $('#modalJPhone').modal('show');
            
        });

        // Boton guardar.
        $('#btnSaveModalJPhone').on('click', function () {

            // Compruebo que se halla tildado el checkbox.
            if ($("#modalJPhoneForm").valid()) {

                // Muestro el loader.
                $("#loaderModal").modal('show');

                var obj = {
                    IdApplication: $('#ApplicationId').val(),
                    CountryCodeNumber: $('#modalJPhoneCountryCode').val(),
                    ProvinceCodeNumber: $('#modalJPhoneProvinceCode').val(),
                    Number: $('#modalJPhoneNumber').val(),
                    InternalNumber: $('#modalJInternalNumber').val(),
                    IdPhoneType: 6
                };

                $.ajax({
                    url: BaseAddress + "/Policies/ChangePhoneRequest",
                    data: obj,
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {

                        // Oculto el loader.
                        $("#loaderModal").modal('hide');

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
                            $('#modalJPhone').modal('hide');
                        }
                    }
                });
            }
        });
    }

    cleanJPhoneModal = function () {

        // Código de País.
        $('#modalJPhoneCountryCode').val("");

        // Código de Provincia.
        $('#modalJPhoneProvinceCode').val("");

        // Número.
        $('#modalJPhoneNumber').val("");

        // Número Interno.
        $('#modalJInternalNumber').val("");

        // Checkbox.
        $('#modalJPhoneCheck').prop('checked', false);
    }

    return {
        initJPhoneModal: initJPhoneModal
    }

})();

$(document).ready(function () {

    $('#collapseInfo').on("shown.bs.collapse", function (e) {
        $('.footable').trigger('footable_initialize');
        $('#iconInfo').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }).on("hidden.bs.collapse", function (e) {
        $('#iconInfo').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    });

    // Fix para el bug de scroll de multiples modals de bootstrap.
    $('.modal').on('hidden.bs.modal', function (e) {
        if ($('.modal').hasClass('in')) {
            $('body').addClass('modal-open');
        }
    });

    // Inicializo el modal para "Dirección Particular".
    homeAddressModal.initHomeAddress();

    // Inicializo el modal para "Dirección Legal".
    legalAddressModal.initLegalAddress();

    // Inicializo el modal para "Dirección de Correspondencia".
    correspondenceAddressModal.initCorrespondenceAddress();

    // Obtengo las provincias para los modal de direcciones.
    getProvinces();

    // Inicializo el modal para "Mail".
    mailModal.initMailModal();

    // Inicializo el modal para "Télefono Particular".
    modalHPhone.initHPhoneModal();

    // Inicializo el modal para "Télefono Celular".
    modalCPhone.initCPhoneModal();

    // Inicializo el modal para "Télefono Laboral".
    modalJPhone.initJPhoneModal();

});