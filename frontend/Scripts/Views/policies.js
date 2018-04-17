
$(function () {

    $("#loading-modal").append(loadingModal);
    $('#filterpolicies').on('change', function () {
        var selected = $('#filterpolicies option:selected').val();
        //Carga de productos
        $('#polizas').empty();
        $.ajax({
            url: BaseAddress + 'Policies/StatusPolicies?status=' + selected,
            contentType: 'application/html; charset-utf-8',
            type: 'GET',
            dataType: 'html',
            cache: false,
            beforeSend: function () {
                $('#loading-modal').show();
            },
            complete: function () {
                $('#loading-modal').hide();
            }
        })
        .success(function (result) {
            $('#polizas').html(result);
            if (selected == 'Inactiva') {
                $(".hideinactive").hide();
                $("#btnCobertura").addClass("hide");
                $("#btnClausula").addClass("hide");
            }
            else if (selected == 'Activa') {
                $(".hideinactive").show();
                $("#btnCobertura").removeClass("hide");
                $("#btnClausula").removeClass("hide");
            }
        })
    });

    $('table.footable').bind('footable_breakpoint', function () {
        $('table.footable').trigger('footable_expand_first_row');
    }).footable();

    //$('.footable').trigger('footable_resize');

    $("form").submit(function () {
        $("input").removeAttr("disabled");
    });

    checkBoxes = function (me) {
        $(me).closest("table").find('input[type="checkbox"]:visible').not(me).prop('checked', me.checked);
    };

    doalert = function (checkboxElem) {
        setTimeout(function () {
            var checkboxes = $('input[type=checkbox]').size();
            var checked = $('input[type=checkbox]:checked').size();
            if (!checkboxElem.checked) {
                $("#checkAll").prop("checked", false);
                if (checked === 0) {
                    //$('#BtnExportPolicies').attr('disabled', 'disabled');
                }
                else if(checked === 1 && $("input[name='columnCheck']:checkbox").is(":checked")){
                    //$('#BtnExportPolicies').attr('disabled', 'disabled');
                }  
            } else {
                if ($("input[name='columnCheck']:checkbox").is(":checked") == false && checked == checkboxes - 1) {
                    $("#checkAll").prop("checked", true);
                }
                //$('#BtnExportPolicies').removeAttr('disabled');  
            }
        }), 100

    };

    hasSelectedPolicies = function () {
        if ($("#divInactivas").is(":visible")) {
            if (document.querySelectorAll('#tblinactivas input[type="checkbox"]:checked').length === 0) {
                return false;
            }
        }
        else {
            if (document.querySelectorAll('#tblactivas input[type="checkbox"]:checked').length === 0) {
                return false;
            }
        }
        return true;
    }

    getSelectedPolicies = function () {
        var policies = new Array();
        if ($("#divInactivas").is(":visible")) {
            $('#tblinactivas').find('tr').each(function () {
                var row = $(this);
                if (row.find('input[type="checkbox"]').is(':checked')) {
                    var url = row.find('a').attr('href');
                    if (url) {
                        /*var urlParts = url.split('/')
                        appId = urlParts[urlParts.length - 1];
                        var n = appId.indexOf('?');
                        appId = appId.substring(0, n != -1 ? n : appId.length);*/
                        appId = getQueryParams(url).idApp;
                        policies.push(appId);
                    }
                }
            });
        }
        else {
            $('#tblactivas').find('tr').each(function () {
                var row = $(this);
                if (row.find('input[type="checkbox"]').is(':checked')) {
                    var url = row.find('a').attr('href');
                    if (url) {
                        /*var urlParts = url.split('/')
                        appId = urlParts[urlParts.length - 1];
                        var n = appId.indexOf('?');
                        appId = appId.substring(0, n != -1 ? n : appId.length);*/
                        appId = getQueryParams(url).idApp;
                        policies.push(appId);
                    }
                }
            });
        }
        return policies;
    }

    function getQueryParams(qs) {
        qs = qs.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    $("#filterpolicies").change();


    $('#btnValidateCustomer').on('click', function () {

        var policyNumber = $('#PolicyNumber').val();
        var docType = $('#TypeDoc').val();
        var docNumber = $('#DocNumber').val();
        var sex = $('#Sex').val();
       
        if (policyNumber == "" || docNumber == "") {
            alert("Por favor ingresá un número de póliza o número de documento");
        }
        else {
            $.ajax({
                url: BaseAddress + 'Policies/ValidateImpersonateUser?PolicyNumber=' + policyNumber + "&TypeDoc=" + docType + "&DocNumber=" + docNumber + "&TypeSex=" + sex,
                contentType: 'application/json',
                type: 'GET',
                dataType: 'json',
                cache: false,
                beforeSend: function () {
                    $('#loading-modal').show();
                },
                complete: function () {
                    $('#loading-modal').hide();
                }
            })
            .success(function (result) {
                if (result.indexOf("OK") >= 0) {
                    window.location = BaseAddress + 'Policies/Policies/';
                }
                else {
                    alert("No existe un cliente que coincida con los datos ingresados");
                }

            })
        }
    });

});